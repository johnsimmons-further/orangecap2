require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    heading: "Welcome to OrangeCap2",
    message: "A static website built with Express and EJS",
    launchUrl: process.env.LAUNCH_URL,
  });
});

app.get("/remote-offer-html", (req, res) => {
  const { height = "100px", width = "100px", color = "red" } = req.query;

  const html = `
    <script>
      const div = document.createElement('div');
      div.style.cssText = 'width:${width};height:${height};background:${color}';
      document.getElementById('target-offer-container').appendChild(div);
    </script>
  `;

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/remote-offer-html-dynamic", (req, res) => {
  const color = req.query.color || "red";

  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  });

  // Return as a JSON string (escaped HTML)
  res
    .type("json")
    .send(
      JSON.stringify(
        `<div style="width:100px;height:100px;background:${color}"></div>`,
      ),
    );
});

// Remote offer endpoint: /api/loyalty-offer
app.get("/api/loyalty-offer", (req, res) => {
  function generateBronzeSVG() {
    return `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#CD7F32;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#B8753D;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B5A2B;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Shield shape -->
      <path d="M60 10 L95 25 L95 60 Q95 85 60 105 Q25 85 25 60 L25 25 Z" 
            fill="url(#bronzeGrad)" 
            filter="url(#shadow)" 
            stroke="#6B4423" 
            stroke-width="2"/>
      
      <!-- Bronze star -->
      <path d="M60 35 L65 50 L80 52 L70 62 L73 77 L60 69 L47 77 L50 62 L40 52 L55 50 Z" 
            fill="#FFE4B5" 
            opacity="0.8"/>
      
      <!-- Number 3 for third tier -->
      <text x="60" y="70" 
            font-family="Arial, sans-serif" 
            font-size="24" 
            font-weight="bold" 
            fill="#FFE4B5" 
            text-anchor="middle">3</text>
    </svg>
  `;
  }

  function generateSilverSVG() {
    return `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#C0C0C0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#A8A8A8;stop-opacity:1" />
        </linearGradient>
        <filter id="silverGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Shield shape -->
      <path d="M60 10 L95 25 L95 60 Q95 85 60 105 Q25 85 25 60 L25 25 Z" 
            fill="url(#silverGrad)" 
            filter="url(#silverGlow)" 
            stroke="#909090" 
            stroke-width="2"/>
      
      <!-- Silver stars -->
      <path d="M60 30 L63 38 L72 39 L66 45 L68 54 L60 49 L52 54 L54 45 L48 39 L57 38 Z" 
            fill="#FFFFFF" 
            opacity="0.9"/>
      <path d="M45 55 L47 60 L52 61 L48 65 L49 70 L45 67 L41 70 L42 65 L38 61 L43 60 Z" 
            fill="#FFFFFF" 
            opacity="0.7"/>
      <path d="M75 55 L77 60 L82 61 L78 65 L79 70 L75 67 L71 70 L72 65 L68 61 L73 60 Z" 
            fill="#FFFFFF" 
            opacity="0.7"/>
      
      <!-- Number 2 for second tier -->
      <text x="60" y="90" 
            font-family="Arial, sans-serif" 
            font-size="20" 
            font-weight="bold" 
            fill="#FFFFFF" 
            text-anchor="middle">2</text>
    </svg>
  `;
  }

  function generateGoldSVG() {
    return `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FFC700;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="goldShine">
          <stop offset="0%" style="stop-color:#FFEF00;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#FFD700;stop-opacity:0" />
        </radialGradient>
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Shield shape -->
      <path d="M60 10 L95 25 L95 60 Q95 85 60 105 Q25 85 25 60 L25 25 Z" 
            fill="url(#goldGrad)" 
            filter="url(#goldGlow)" 
            stroke="#CC8800" 
            stroke-width="2"/>
      
      <!-- Shine effect -->
      <ellipse cx="50" cy="35" rx="25" ry="20" fill="url(#goldShine)" opacity="0.6"/>
      
      <!-- Crown -->
      <path d="M45 40 L48 50 L60 45 L72 50 L75 40 L70 48 L60 43 L50 48 Z" 
            fill="#FFEF00" 
            stroke="#CC8800" 
            stroke-width="1"/>
      
      <!-- Large star -->
      <path d="M60 50 L66 62 L79 64 L69.5 73.5 L72 87 L60 80 L48 87 L50.5 73.5 L41 64 L54 62 Z" 
            fill="#FFFFFF" 
            opacity="0.95" 
            stroke="#FFD700" 
            stroke-width="1"/>
      
      <!-- Number 1 for top tier -->
      <text x="60" y="73" 
            font-family="Arial, sans-serif" 
            font-size="24" 
            font-weight="bold" 
            fill="#CC8800" 
            text-anchor="middle">1</text>
      
      <!-- Sparkles -->
      <circle cx="35" cy="30" r="2" fill="#FFFFFF" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="85" cy="35" r="2" fill="#FFFFFF" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="30" cy="65" r="2" fill="#FFFFFF" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="90" cy="70" r="2" fill="#FFFFFF" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
  }
  const { tier = "bronze" } = req.query;

  const tiers = {
    bronze: {
      name: "Bronze Member",
      discount: "10%",
      color: "#CD7F32",
      gradient1: "#CD7F32",
      gradient2: "#8B5A2B",
      icon: generateBronzeSVG(),
      perks: ["Free standard shipping", "Early sale access", "Birthday gift"],
      cta: "Shop Bronze Exclusives",
      badge: "🥉",
    },
    silver: {
      name: "Silver Member",
      discount: "20%",
      color: "#C0C0C0",
      gradient1: "#C0C0C0",
      gradient2: "#808080",
      icon: generateSilverSVG(),
      perks: [
        "Free express shipping",
        "Priority support",
        "Exclusive events",
        "Double points",
      ],
      cta: "Shop Silver Exclusives",
      badge: "🥈",
    },
    gold: {
      name: "Gold Member",
      discount: "30%",
      color: "#FFD700",
      gradient1: "#FFD700",
      gradient2: "#FFA500",
      icon: generateGoldSVG(),
      perks: [
        "Free overnight shipping",
        "24/7 VIP support",
        "Private shopping events",
        "Triple points",
        "Personal stylist",
      ],
      cta: "Shop Gold Exclusives",
      badge: "🥇",
    },
  };

  const tierData = tiers[tier.toLowerCase()] || tiers.bronze;

  res.setHeader("Content-Type", "text/html");
  res.send(generateOfferHTML(tierData));
});

function generateOfferHTML(tierData) {
  return `
    <div class="loyalty-offer" style="
      background: linear-gradient(135deg, ${tierData.gradient1}15 0%, ${tierData.gradient2}25 100%);
      border: 3px solid ${tierData.color};
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 40px ${tierData.color}30;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
      overflow: hidden;
      animation: slideInUp 0.6s ease-out;
    ">
      <!-- Background decorative elements -->
      <div style="
        position: absolute;
        top: -50px;
        right: -50px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, ${tierData.color}20, transparent);
        pointer-events: none;
      "></div>
      
      <!-- Badge ribbon -->
      <div style="
        position: absolute;
        top: 20px;
        right: -10px;
        background: ${tierData.color};
        color: white;
        padding: 8px 25px 8px 15px;
        font-weight: bold;
        font-size: 0.9em;
        clip-path: polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      ">
        ${tierData.badge} ${tierData.name.toUpperCase()}
      </div>
      
      <!-- SVG Icon -->
      <div style="text-align: center; margin-bottom: 30px;">
        ${tierData.icon}
      </div>
      
      <!-- Main content -->
      <div style="text-align: center;">
        <h1 style="
          color: #1a1a1a;
          font-size: 2.5em;
          margin: 0 0 10px 0;
          font-weight: 800;
          letter-spacing: -0.5px;
        ">
          Welcome Back, ${tierData.name}!
        </h1>
        
        <div style="
          background: linear-gradient(135deg, ${tierData.gradient1}, ${tierData.gradient2});
          color: white;
          display: inline-block;
          padding: 15px 40px;
          border-radius: 50px;
          font-size: 2em;
          font-weight: bold;
          margin: 20px 0;
          box-shadow: 0 8px 20px ${tierData.color}40;
          animation: pulse 2s infinite;
        ">
          ${tierData.discount} OFF
        </div>
        
        <p style="
          color: #555;
          font-size: 1.2em;
          margin: 20px 0 30px 0;
          line-height: 1.6;
        ">
          Your exclusive ${tierData.name.toLowerCase()} benefits are waiting!
        </p>
        
        <!-- Perks list -->
        <div style="
          background: white;
          border-radius: 15px;
          padding: 25px;
          margin: 30px 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          text-align: left;
        ">
          <h3 style="
            color: ${tierData.color};
            margin: 0 0 15px 0;
            font-size: 1.3em;
            text-align: center;
          ">
            ✨ Your Exclusive Perks
          </h3>
          ${tierData.perks
            .map(
              (perk) => `
            <div style="
              padding: 10px 0;
              border-bottom: 1px solid #f0f0f0;
              display: flex;
              align-items: center;
            ">
              <span style="
                color: ${tierData.color};
                margin-right: 10px;
                font-size: 1.2em;
              ">✓</span>
              <span style="color: #333; font-size: 1em;">${perk}</span>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <!-- CTA Button -->
        <button onclick="window.dispatchEvent(new CustomEvent('loyaltyOfferClick', {detail: {tier: '${tierData.name}'}}))" style="
          background: linear-gradient(135deg, ${tierData.gradient1}, ${tierData.gradient2});
          color: white;
          border: none;
          padding: 18px 50px;
          border-radius: 50px;
          font-size: 1.2em;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 8px 25px ${tierData.color}50;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        " 
        onmouseover="
          this.style.transform='translateY(-3px)';
          this.style.boxShadow='0 12px 35px ${tierData.color}60';
        " 
        onmouseout="
          this.style.transform='translateY(0)';
          this.style.boxShadow='0 8px 25px ${tierData.color}50';
        ">
          ${tierData.cta} →
        </button>
        
        <p style="
          margin-top: 25px;
          color: #999;
          font-size: 0.85em;
          font-style: italic;
        ">
          Offer automatically applied at checkout
        </p>
      </div>
    </div>
    
    <style>
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      .loyalty-offer button:active {
        transform: translateY(-1px) !important;
      }
    </style>
  `;
}

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
    launchUrl: process.env.LAUNCH_URL,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
