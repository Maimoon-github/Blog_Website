export interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  image: string;
  category: Category;
  author: Author;
  tags: Tag[];
  featured?: boolean;
}

export const mockAuthors: Author[] = [
  {
    name: "Eleanor Sterling",
    slug: "eleanor-sterling",
    role: "Sustainable Architect & Writer",
    bio: "Eleanor has over 12 years of experience in natural building techniques, specializing in cob design and passive thermal insulation.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Julian Mercer",
    slug: "julian-mercer",
    role: "Travel Journalist & Cabin Connoisseur",
    bio: "Julian spends 200 days a year scouting the world's most romantic and remote stays, documenting the perfect blends of architecture and luxury.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
];

export const mockCategories: Category[] = [
  {
    name: "Hot Tub Getaways",
    slug: "hot-tub-getaways",
    description: "Handpicked hotels, cabins, and suites featuring private in-room hot tubs for the ultimate romantic retreat.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Earthen Architecture",
    slug: "earthen-architecture",
    description: "Deep dives into building with cob, adobe, rammed earth, and other ancient, carbon-neutral materials.",
    image: "https://images.unsplash.com/photo-1518281400699-c26689161a63?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Off-Grid Living",
    slug: "off-grid-living",
    description: "Practical guides, setups, and inspiring journeys of people building self-sufficient lifestyles close to nature.",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=80",
  },
];

export const mockTags: Tag[] = [
  { name: "Cob Building", slug: "cob-building" },
  { name: "Rammed Earth", slug: "rammed-earth" },
  { name: "Jacuzzi Suites", slug: "jacuzzi-suites" },
  { name: "Romantic Stays", slug: "romantic-stays" },
  { name: "Thermal Mass", slug: "thermal-mass" },
  { name: "DIY Construction", slug: "diy-construction" },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Cob vs. Adobe vs. Rammed Earth: Which Technique Is Right for You?",
    slug: "cob-vs-adobe-vs-rammed-earth",
    excerpt: "Understand the differences, costs, and labor requirements of the three primary earth building techniques to start your building journey.",
    content: `Earthen architecture is experiencing a modern renaissance. As builders search for ways to construct homes that are energy-efficient, healthy, and low-impact, they are looking to the earth under their feet. However, "earth building" is not a single method; it encompasses several distinct traditions. Today, we'll explore the three most common: Cob, Adobe, and Rammed Earth.

### 1. Cob: The Sculptor's Medium
Cob is a mixture of clay-rich soil, sand, straw, and water. Unlike adobe, it is not formed into bricks, and unlike rammed earth, it is not packed into temporary forms. Instead, cob is piled onto the foundation in thick, wet layers (known as "cobs") and sculpted directly by hand or tool.

* **Pros:** Allows for organic, curved walls, built-in furniture, and complete artistic freedom. Extremely cheap materials.
* **Cons:** Labor-intensive. Walls build slowly as each layer must dry before the next is added. Not suited for rainy seasons.

### 2. Adobe: The Traditional Brick
Adobe consists of the same basic ingredients as cob, but the mixture is poured into molds and sun-dried to form solid building blocks. These bricks are then laid with a mud mortar to create walls.

* **Pros:** Modular and familiar to lay. Bricks can be made in advance and stored. Easy to estimate material needs.
* **Cons:** Requires a lot of flat space for drying bricks. Adobe walls are susceptible to seismic activity without proper reinforcement.

### 3. Rammed Earth: Modern Industrial Strength
Rammed earth is created by compacting damp soil (usually a carefully graded mix of gravel, sand, clay, and a small amount of stabilizer like cement) into heavy wooden forms. The soil is rammed down in 6-inch layers using pneumatic or manual rammers. Once the forms are removed, a solid, beautiful, layered stone-like wall remains.

* **Pros:** Highly durable, matches concrete in compressive strength. Sleek, contemporary appearance with distinctive layered look.
* **Cons:** Formwork is expensive and complex. Requires heavy machinery or intensive physical labor for ramming. Highly dependent on precise soil blends.

Which is right for you? If you love soft lines and want to build it yourself over a few summers, **Cob** is your choice. If you prefer a modular, step-by-step approach, choose **Adobe**. If you want a sleek, modern home built with professional contractors, **Rammed Earth** is the answer.`,
    publishDate: "May 24, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?w=1200&auto=format&fit=crop&q=80",
    category: mockCategories[1],
    author: mockAuthors[0],
    tags: [mockTags[0], mockTags[1], mockTags[4], mockTags[5]],
    featured: true,
  },
  {
    id: "2",
    title: "10 Romantic Hotels with In-Room Hot Tubs for Your Next Getaway",
    slug: "romantic-hotels-with-in-room-hot-tubs",
    excerpt: "Discover the ultimate curated list of luxury suites and remote cottages featuring private hot tubs directly in the room.",
    content: `When it comes to planning a romantic weekend getaway, few amenities compare to a private in-room hot tub. It transforms an ordinary hotel room into a sanctuary of relaxation, allowing you and your partner to unwind in complete privacy. 

From mountain cabins to urban boutique hotels, here are our top selections for the ultimate hot tub escape:

### 1. The Sequoia Starlight Cabin (California)
Nestled high in the redwood forests, this rustic-chic cabin features a deep redwood hot tub positioned directly in front of floor-to-ceiling glass windows. Soak in privacy while gazing at the star-studded forest canopy.

### 2. The Grand Amber Suite (New York City)
For those who prefer a city break, this luxury suite in Manhattan offers a private terrazzo jacuzzi tub positioned overlooking the iconic city skyline. Fully automated lighting and sound systems let you set the perfect mood.

### 3. Emerald Lake Eco-Lodge (Oregon)
Combining natural living with premium luxury, this lakeside lodge features geothermal heated hot tubs built into natural stone alcoves inside each cabin. It is the perfect blend of organic architecture and romantic privacy.

### What to Look for When Booking
* **Tub Type:** Jacuzzi (jetted air/water) vs. soaking hot tub (deep water, no jets).
* **Location:** In-room (usually master bedroom/bathroom area) vs. private deck (outdoors but private).
* **Sanitation:** Confirm the hotel's cleaning protocols for in-room jetted tubs.

Whether celebrating an anniversary or simply needing a weekend of peace, these destinations guarantee an unforgettable romantic experience.`,
    publishDate: "May 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80",
    category: mockCategories[0],
    author: mockAuthors[1],
    tags: [mockTags[2], mockTags[3]],
    featured: false,
  },
  {
    id: "3",
    title: "The Thermal Mass Advantage: Why Earthen Homes Stay Cool in Summer and Warm in Winter",
    slug: "thermal-mass-advantage-earthen-homes",
    excerpt: "An in-depth scientific breakdown of how clay and soil walls act as natural batteries to regulate home temperatures automatically.",
    content: `One of the most striking experiences of walking into an earthen home on a sweltering 100°F summer day is the immediate drop in temperature. It feels as if a heavy air conditioner is running, yet there is no noise and no electricity being consumed. The secret lies in a physical property called **thermal mass**.

### What is Thermal Mass?
Thermal mass is the ability of a material to absorb, store, and slowly release heat energy. High-density materials like stone, brick, concrete, and compressed earth require a significant amount of heat energy to raise their temperature. 

In contrast, lightweight materials (like wood-frame walls with standard fiberglass insulation) have very low thermal mass. They block heat transmission briefly but cannot store it.

### The Diurnal Shift: Natural Air Conditioning
In regions with a high diurnal temperature swing (hot days and cool nights), earthen walls act like thermal batteries:

1. **During the Day:** The sun beats down on the exterior of a thick cob or rammed earth wall. Instead of passing immediately into the house, the heat is absorbed by the dense earth wall. The interior remains cool.
2. **The Time Lag:** It takes approximately 8 to 12 hours for the heat to migrate through a 2-foot-thick earth wall. This delay is known as "thermal lag."
3. **During the Night:** As the outdoor temperature drops, the heat finally reaches the inner surface of the wall and radiates into the living space, keeping the home warm during the chilly night.
4. **The Cycle Resets:** The cool night air cools the walls down from the outside, readying them to absorb heat again the following morning.

### Optimizing Thermal Mass
To make the most of thermal mass, earthen homes should incorporate passive solar design:
* **South-Facing Windows:** Allow low-angle winter sun to shine directly onto earthen floors or interior walls, heating them up during the day.
* **Overhangs:** Block the high-angle summer sun from hitting the glass, ensuring the interior walls stay cool.

By working with physics rather than fighting it, earth builders create spaces that are naturally comfortable, reducing energy bills by up to 60%.`,
    publishDate: "May 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    category: mockCategories[1],
    author: mockAuthors[0],
    tags: [mockTags[1], mockTags[4]],
    featured: false,
  },
];
