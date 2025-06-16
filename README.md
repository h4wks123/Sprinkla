<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
[![LOGO]](https://github.com/h4wks123/Sprinkla/blob/main/web/public/sprinkla_logo.svg)
  
  <h3 align="center">SPRINKLA</h3>
  
  <p align="center">
    A sophisticated end to end donut delivery system with real time updates!
    <br />
    <a href="https://sprinkla.vercel.app"><strong>View Demo »</strong></a>
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Sprinkla is a conceptual delivery tracking system built to demonstrate my full stack development skills. The project features real-time delivery status updates using Server-Sent Events (SSE), simulating how modern logistics platforms track and display order progress. While Sprinkla isn't tied to a real business or live data, it showcases my ability to design scalable architecture, implement real-time communication, and build responsive user interfaces. From backend APIs and authentication to frontend state management and UI, the entire system was built from scratch using modern tools like Next.js, TypeScript, and Turso.

### 🚧 Built With

This section lists the main languages, libraries, and tools used to build the project.

#### 🧠 Programming Languages

* [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=fff)](https://www.typescriptlang.org/)

#### 🎨 Front End

* [![HTML](https://img.shields.io/badge/HTML5-E34F26.svg?logo=html5\&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [![CSS](https://img.shields.io/badge/CSS3-264de4?logo=css3\&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)](https://reactjs.org/)
* [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)](https://nextjs.org/)
* [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC.svg?logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
* [![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=vercel\&logoColor=white)](https://ui.shadcn.dev)

#### 🛠️ Back End

* [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
* [![Express.js](https://img.shields.io/badge/Express.js-404d59?logo=express\&logoColor=white)](https://expressjs.com/)
* [![Drizzle ORM](https://img.shields.io/badge/Drizzle-C5F74F.svg?style=for-the-badge&logo=Drizzle&logoColor=black)](https://orm.drizzle.team/)
* [![Turso](https://img.shields.io/badge/Turso-4FF8D2.svg?style=for-the-badge&logo=Turso&logoColor=black)](https://turso.tech/)

#### 🚀 Hosting & Deployment

* [![Vercel](https://img.shields.io/badge/Vercel-000000.svg?logo=vercel\&logoColor=white)](https://vercel.com/)
* [![Render](https://img.shields.io/badge/Render-000000.svg?style=for-the-badge&logo=Render&logoColor=white)](https://render.com/)

#### 📦 Package Manager

* [![npm](https://img.shields.io/badge/npm-CB3837?logo=npm\&logoColor=white)](https://www.npmjs.com/)
* [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=fff)](https://vitejs.dev/)

#### 🧰 Tools

* [![VS Code](https://img.shields.io/badge/VS_Code-007ACC?logo=visualstudiocode\&logoColor=white)](https://code.visualstudio.com/)
* [![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma\&logoColor=white)](https://www.figma.com/)
* [![Canva](https://img.shields.io/badge/Canva-00C4CC?logo=canva\&logoColor=white)](https://www.canva.com/)

<!-- GETTING STARTED -->

## 🚀 Installation

Follow these steps to run the project locally:

1. **Clone the repository**
   ```sh
   git clone https://github.com/h4wks123/Sprinkla.git
   ```

2. **Navigate to the `web` folder and install dependencies**
   ```sh
   cd web
   npm install
   ```

3. **Create a `.env` file in the `web` folder root**

4. **Set up a [Turso](https://turso.tech/) account and database**, then add the following to your `.env` file:
   ```env
   TURSO_CONNECTION_URL=your_turso_connection_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   ```

5. **Add the required NextAuth and SSE environment variables:**
   ```env
   NEXTAUTH_URL=http://localhost:3000/web
   NEXT_PUBLIC_SSE_DOMAIN=http://localhost:3000/sse-server
   ```

6. **Generate a NextAuth secret using OpenSSL:**

   ```sh
   openssl rand -base64 32
   ```

7. **Add the generated secret to your `.env` file:**
   ```env
   NEXTAUTH_SECRET=your_generated_secret
   ```

8. **Navigate to the `sse-server` folder and install dependencies:**
   ```sh
   cd ../sse-server
   npm install
   ```
   
<!-- LICENSE -->

## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

Here’s a cleaned-up and one-liner version of your `## Contact` section with proper formatting and placeholders for links:

---

## 📬 Contact

You can reach me through the following platforms:

[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white\&logoColor=fff)](https://www.linkedin.com/in/ivanne-dave-bayer-a23b30302/)  
[![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail\&logoColor=white)](mailto:ivannebayer@gmail.com)  
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/h4wks123)

<!-- ACKNOWLEDGMENTS -->

Here’s an improved and cleaner version of your **Acknowledgments** section:

---

## 🙏 Acknowledgments

Big thanks to the following tools and resources that helped make this project possible:

* [**Tabler Icons**](https://tabler.io/icons) – Simple, customizable SVG icons
* [**Color Hunt**](https://colorhunt.co/) – Curated color palettes for design inspiration
* [**Real Time Colors**](https://www.realtimecolors.com/?colors=050315-fbfbfe-2f27ce-dedcff-433bff&fonts=Inter-Inter) – Live preview tool for color and font combinations
* [**React Toastify**](https://www.npmjs.com/package/react-toastify) – Elegant notification system for React
* [**React Popup**](https://react-popup.elazizi.com/) – Lightweight popup component for React
* [**Canva AI Image Generator**](https://www.canva.com/ai-image-generator/) – AI-powered tool for generating images quickly
