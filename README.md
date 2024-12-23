## Folder Structure

First, run the development server:

```bash
project-root/
├── public/                         # Static assets (images, fonts, icons)
│   ├── images/                     # Images for the website
│   ├── models/                     # 3D models if used
│
├── src/                            # Source code
│   ├── app/                        # Next.js App Router directory
│   └── favicon.ico                 # Favicon
│   │   ├── layout.tsx              # Root layout for the entire app
│   │   ├── page.tsx                # Main "Coming Soon" landing page
│   │
│   ├── components/                 # Reusable components
│   │
│   ├── styles/                     # Custom styling
│   │   ├── globals.css             # TailwindCSS or global styles
│   │
│   ├── utils/                      # Reusable logic
│   │
│   ├── data/                       # Static or mock data
│   │
│   ├── assets/                     # Local static files
│   │
├── package.json                    # Project dependencies and scripts
├── tailwind.config.js              # TailwindCSS configuration (optional)
├── next.config.js                  # Next.js configuration
```
