# My Dog Journey - A Personal Story

A personal website sharing my journey through the frustrations and eventual breakthroughs in dog training, told as a linear narrative.

## What This Is

This isn't a business site with sections and cards. It's my story - raw, honest, and sometimes messy - told from beginning to end like you're reading a letter or blog post. If you're in that dark place of feeling like nothing works and you're failing your dog, I want you to know you're not alone.

## Design Philosophy

Instead of the typical section-based layout everyone uses, this site flows like a story:
- **Linear narrative** - reads top to bottom like an article
- **No cards or grids** - just paragraphs that flow naturally
- **Pull quotes and asides** - emphasize key moments
- **Chapter breaks** - gentle dividers between story beats
- **Reading-focused typography** - optimized for long-form reading

The design is intentionally:
- **Simple and uncluttered** - nothing distracts from the narrative
- **Green and calming** - soft sage tones, nature-inspired
- **Personal and intimate** - feels like a conversation
- **Mobile-friendly** - great reading experience on any device

## Customization

### Tell Your Story

The site is structured for flowing narrative:
- **Hero intro**: Your opening hook
- **Story blocks**: Individual beats in your journey (edit in HTML)
- **Chapter headings**: Mark major turning points
- **Pull quotes**: Emphasize key insights
- **Dividers**: Create breathing space between chapters

Edit the `.story-narrative` section in `index.html` to tell your story. Each `story-block` is a beat in the narrative.

### Adjust the Colors

In `styles.css`, modify these CSS variables:
```css
:root {
    --accent-green: #5d8a5f;  /* Main green accent */
    --dark-green: #4a6e4c;    /* Darker elements */
    --light-green: #a8bfa5;   /* Subtle accents */
    --cream: #f8faf7;         /* Background */
}
```

### Typography

The site uses these special text treatments:
- `.story-aside` - Italicized reflections with left border
- `.story-highlight` - Important realizations in green box
- `.story-pullquote` - Large centered quotes
- `.story-divider` - Visual breaks between sections

## Deploy Your Site

This is a static site - just HTML, CSS, and JavaScript. Here are easy (and free) ways to share it:

### GitHub Pages
1. Create a GitHub repository
2. Upload these files
3. Enable GitHub Pages in Settings
4. Your site will be live at `yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the folder to [Netlify](https://netlify.com)
2. Your site goes live instantly with a custom URL

## The Contact Form

Currently, the form just shows a success message. To actually receive messages:
- Use [Formspree](https://formspree.io/) (easiest - just add your email)
- Use [Netlify Forms](https://www.netlify.com/products/forms/) (free tier available)
- Set up your own backend if you're technical

## A Note

This template came from my real experience struggling with dog training. If you use it, I hope it helps you share your story authentically. Feel free to adapt it completely to your journey - whatever that journey may be.

---

Made with 💚 and a lot of patience. If this helps you, that makes me happy.
