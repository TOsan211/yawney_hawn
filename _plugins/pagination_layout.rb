# jekyll-paginate-v2 clones the source page's front matter (including
# `layout`) verbatim onto every generated page, so page 1 and /page/N/
# can't pick different layouts via front matter alone. Route them here
# instead, using the `pagination_info` each generated page carries.
#
# Separately, jekyll-paginate-v2 always serves page 1 at the source
# page's own path (here, `/`) and has no option to also emit it at
# `/page/1/`. We add that ourselves by duplicating the page-1 object and
# pointing it at `/page/1/` with the no-hero layout. The duplicate shares
# the exact same `pager` (posts, prev/next links, total_pages) as `/`,
# so it can't drift out of sync as the post count changes.
Jekyll::Hooks.register :site, :pre_render do |site|
  fix_ext = lambda do |page|
    # jekyll-paginate-v2 builds these pages with name=".html" (just the
    # extension, no "index" basename), and Ruby's File.extname(".html")
    # is "" (a leading dot alone reads as a dotfile, not an extension).
    # That leaves page.ext/output_ext empty, so Page#html? is always
    # false for every page this plugin generates -- which silently drops
    # them all (including `/` itself) from jekyll-sitemap's sitemap.xml.
    page.name = "index.html"
    page.ext = ".html"
    page.basename = "index"
  end

  site.pages.each do |page|
    info = page.data["pagination_info"]
    next unless info

    page.data["layout"] = "pages" if info["curr_page"] > 1
    fix_ext.call(page)
  end

  page1 = site.pages.find do |page|
    info = page.data["pagination_info"]
    info && info["curr_page"] == 1
  end
  next unless page1
  next if site.pages.any? { |page| page.data["pagination_info"] && page.url == "/page/1/index.html" }

  alias_page = page1.dup
  alias_page.data = page1.data.dup
  alias_page.data["layout"] = "pages"
  # /page/1/ is a byte-for-byte duplicate of `/`'s post list, so point
  # search engines at the canonical `/` and keep it out of the sitemap
  # instead of letting it compete with `/` as duplicate content.
  # Jekyll's own absolute_url filter (used for every other page's canonical)
  # lowercases the host, so match that here to avoid a cosmetic mismatch.
  home_url = "#{site.config["url"]}#{site.config["baseurl"]}/"
  alias_page.data["canonical_url"] = home_url.sub(%r{\Ahttps?://[^/]+}) { |host| host.downcase }
  alias_page.data["sitemap"] = false
  alias_page.set_url("/page/1/index.html")
  fix_ext.call(alias_page)
  site.pages << alias_page

  # jekyll-paginate-v2 hardcodes page 2's "previous" link to the source
  # page's own path (`/`). Since `/page/1/` now exists, send it there
  # instead so the /page/N/ sequence stays internally consistent.
  page2 = site.pages.find do |page|
    info = page.data["pagination_info"]
    info && info["curr_page"] == 2
  end
  page2&.pager&.instance_variable_set(:@previous_page_path, "/page/1/")
end
