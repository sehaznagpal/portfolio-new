# Making authenticity as easy to verify as price

A buyer-side app that brings government craft certification into the shopping journey

**Role:** Solo designer and researcher | **Duration:** 1 month (2026)
**Tags:** Buyer-side Mobile App · Information Architecture · Figma Prototype

[Try the Prototype →] (https://bit.ly/moolroop-casestudy-prototype-sehaz)

**TL;DR**
**Problem:** Proof that an Indian craft is genuine already exists in government records, but it sits several clicks away from where people actually shop.
**What I did:** Mapped how authenticity is communicated today, then designed a buyer-side app where verification is part of browsing, not a detour from it.
**What I designed:** A two-layer verification system, a quick summary for everyone and the full record for anyone who wants it, inside a shopping flow that stays familiar.

---

## 01 The proof exists. Nobody uses it.

> **Left column:** "The problem was never missing information. It was the effort it takes to use it."

A GI tag (Geographical Indication) is a government-issued legal certification that ties a craft to a specific place, process and community of makers: a Kashmiri Pashmina, a Sanganeri block print. India has over 400 of them. In theory, a buyer can check whether a product is genuine. In practice, almost nobody does, because the information is fragmented, hard to access and completely disconnected from the buying journey.

I noticed the gap while freelance-writing product descriptions for craft sellers, sourcing details from the same government databases. The records were detailed and public. They just lived in a registry that no shopper would ever open in the middle of a purchase.

> **[VISUAL 1: The Official Record]** · tone: sky
> Image: gi-search-registered-applications.png
> Caption: "GI Search, the government's registered applications database. Accurate, public and nowhere near a buy button."

---

## 02 Understanding the existing experience

> **Left column:** "Buyers keep asking if it's real. No platform makes it easy to answer."

Before proposing anything, I looked at how authenticity is communicated today across three sources: the official GI databases, community discussions such as Reddit, and existing craft marketplaces.

Buyers frequently ask whether a product is genuine, especially for high-value handicrafts bought online. Even Amazon Karigar, India's largest artisan programme, has been reported to fail at telling authentic craft apart from mass-produced imitations.

I then compared five platforms that sell Indian handicrafts against six authenticity criteria. Most cleared one or two at best. None showed a GI registration number or linked to the official registry. That made the direction clear: not another craft marketplace, but a shopping experience where verification is built in.

> **[VISUAL 2: Competitive Landscape]** · tone: dark · *(built as a component, ported from the old ComparisonTable)*
> Columns: Amazon Karigar · GiTagged · GoSwadeshi · India Handmade · iTokri · MoolRoop (highlighted, "My proposal")
> Rows (yes / partial / no):
> Mobile app: yes, yes, no, yes, no, yes
> GI-certified products only: no, yes, no, no, no, yes
> Shows GI registration number: no, no, no, no, no, yes
> Links to official registry: no, no, no, no, no, yes
> Shows authorised seller info: no, no, no, no, partial, yes
> Discovery by geographic origin: partial, partial, yes, partial, yes, yes
> Caption: "Discovery by origin is common. Proof of origin is not."

---

## 03 Turning six steps into one tap

> **Left column:** "Verification shouldn't be a research project."

Today, a careful buyer has to browse a product, notice a GI claim, search a government website, find the registration, compare it with the seller's details and then decide whether to trust it. Most people stop at step two.

MoolRoop collapses that into a single action. Browse, tap Verify, read a summary of the official record, decide. The design goal was specific: reduce the effort required to verify authenticity without replacing the official source.

Three principles followed from that goal and guided every screen:

- **Trust should be immediate.** A buyer should understand whether a product is authentic within seconds, without reading official documents.
- **Verification should stay transparent.** The app summarises official records but never replaces them. Every summary links directly to the original government source.
- **Provenance is part of discovery.** Authenticity isn't only a certificate. Knowing where a craft comes from and how it's made is part of why it's worth buying.

> **[VISUAL 3: The Opportunity]** · tone: brand · *(built as a component)*
> Two columns, side by side.
> TODAY: Browse product → Notice GI tag → Search government website → Find registration → Compare seller details → Trust (?) and decide
> MOOLROOP: Browse product → Tap Verify → Verification summary and records → Decide
> Caption: "Six steps, most of them outside the app, become four inside it."

**Scope.** MoolRoop is deliberately buyer-side: no login, no checkout and no seller flows. The prototype focuses on the journey that matters, from discovery to verification.

---

## 04 Structure before screens

> **Left column:** "I mapped the whole app before designing a single screen."

I mapped the full structure first: home, categories, states, product pages, and exactly where verification and provenance would sit inside them. Three structural decisions came out of that map, and each one is a choice between the obvious pattern and the one this problem needed.

- **One craft, many products.** The obvious pattern is one listing per product. But a single craft like Pashmina can be sold as a shawl, a kurta or a saree, each possibly from a different seller. So every craft has its own page with all its SKUs underneath. Verification stays tied to the craft, while sellers and formats vary below it.
- **Two independent ways in.** Most marketplaces support one browsing path well. But "what's made in Rajasthan?" and "I need a gift" are genuinely different searches. MoolRoop treats geography (state) and use (type) as two independent filters, so both paths stay equally short.
- **Search that never hides.** Search usually lives behind its own tap. Since the app's whole purpose is reducing effort, the search bar stays visible across every browsing screen.

> **[VISUAL 4: App Structure]** · tone: dark · *(built as a component, ported from the old SitemapTree)*
> Welcome carousel → Explore / Home
> Home → Search · Categories · Explore by State · Most Popular · Recommended · Wishlist · Bag · Menu
> Categories → Category page → Product type page → Product page
> Explore by State → State page → (same flow as Categories)
> Product page → How it's made · Provenance trail · Bag → Checkout (future scope) · Wishlist
> Menu → About · Help & Support · Language (future)
> Caption: "Two entry points, one product page, and verification exactly one tap deep."

---

## 05 Designing the journey

> **Left column:** "Familiar where it should be. Different only where it matters."

The app opens with a short welcome sequence, then drops the buyer into a shopping experience that looks deliberately familiar. GI-certified crafts sit inside the layouts people already know, so discovery never feels like a detour into paperwork.

> **[VISUAL 5: First Impression]** · tone: sky
> Screens, three in a row, phone-framed: loader-1, loader-2, loader-3
> Caption: "A short welcome sequence before the shopping begins."

> **[VISUAL 6: Two Ways In]** · tone: brand
> Screens, four in a row, phone-framed: home, handicrafts, rajasthan, pashmina-list
> Captions: "Home" · "Browse by category" · "Browse by state" · "Every SKU under one craft"

Every product page carries two stories at once: the item for sale and the place it comes from. The origin sits beside the price, not behind a separate link a buyer has to go looking for.

> **[VISUAL 7: Two Stories]** · tone: dark
> Screens, side by side: pashmina-product, pashmina-product-1
> Captions: "The product" · "How it's made"

> **Left column:** "A badge asks for trust. A record earns it. I needed both."

Verification was the hardest design problem. A trust badge alone is fast, but it asks the buyer to take the app's word for it. The full registry record is honest, but no one can read it at a glance. So verification works in two layers. The first is a plain-language summary that confirms whether the seller is authorised. The second is the full GI registration and seller detail, with a link to the original government record. The buyer decides how deep to go.

> **[VISUAL 8: Verify in One Tap]** · tone: brand
> Screens, side by side, labelled: pashmina-provenance-1 "Layer 1: the summary" · pashmina-provenance-2 "Layer 2: the full record"
> Caption: "Quick for most people, complete for anyone who wants proof."

Everything else stays deliberately plain. Menu, wishlist and bag do their job and get out of the way, so verification is the one thing in the app that stands out.

> **[VISUAL 9: Kept Plain on Purpose]** · tone: sky
> Screens, four in a row: search-bar, menu, wishlist, bag
> Captions: "Search" · "Menu" · "Wishlist" · "Bag"

---

## 06 Visual language

> **Left column:** "Rooted in craft, without looking like a government website."

The visual language had to feel trustworthy without feeling official, and warm without becoming decorative. Fletcha M gives headings a crafted, editorial character. Open Sans keeps product details, prices and verification text easy to read at small sizes. Five colours carry the app, with a near-black to keep it grounded.

> **[VISUAL 10: Visual Language]** · tone: dark · *(built as a component)*
> Type: "Fletcha M" specimen (headings) · "Open Sans" specimen (body)
> Colours: #D9CE6A · #BF393C · #2B4C5F · #F3B5C0 · #24211F, as large swatches with hex codes
> Caption: "Two typefaces, five colours, one job: make verification feel trustworthy, not bureaucratic."

---

## 07 What this does, and doesn't, solve

> **Left column:** "This doesn't end counterfeiting. It makes honesty easier to prove."

MoolRoop started as a question about trust and became an exercise in making public information usable. It doesn't solve counterfeiting. What the provenance trail does is make fraud more visible and more effortful, and give honest sellers a way to show proof.

The most important open question is one only real users can answer: do buyers actually open the verification trail, or do they simply trust that it's there? Those are two different UX outcomes, and they would lead the design in different directions. That is the first thing I'd test.

Where it could go next:

- **Live registry integration**, syncing authorised seller information from official databases automatically.
- **QR verification**, so a buyer can scan a GI label in a shop and check it instantly.
- **Artisan profiles** that introduce the people behind each craft.
- **A seller dashboard** for verified sellers to manage products and certification details.

[Try the Prototype →]
