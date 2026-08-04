---
layout: default
title: Book
permalink: /book/
description: "The Gentle Arts of Living Softly — Yawney Hawn's book on gentle excuses, tiny mischiefs, and the quiet relief of not having it all together."
books:
  - title: "The Gentle Arts of Living Softly"
    author: "Yawney Hawn"
    amazon_url: "https://www.amazon.com/dp/B0H6JYYM1L"
    image: "/assets/img/books/the_gentle_arts_of_living_softly.jpg"
---

# Book

<div class="bookshelf">
  {% for book in page.books %}
  <div class="bookshelf__item">
    <a href="{{ book.amazon_url }}" target="_blank" rel="noopener noreferrer" class="bookshelf__cover-link">
      <img src="{{ book.image | relative_url }}" alt="{{ book.title }} cover" class="bookshelf__cover">
    </a>
    <h3 class="bookshelf__title">{{ book.title }}</h3>
    <p class="bookshelf__author">{{ book.author }}</p>
    <a href="{{ book.amazon_url }}" target="_blank" rel="noopener noreferrer" class="bookshelf__buy">View on Amazon</a>
  </div>
  {% endfor %}
</div>
