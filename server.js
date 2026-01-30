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
    title: "Target Remote Offers Demo",
    heading: "Adobe Target Remote Offers Demo",
    message: "Personalized loyalty experiences using cached remote offers",
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



app.get('/api/loyalty-offer', (req, res) => {
  const { tier = 'bronze' } = req.query;

  const tiers = {
    base: {
      name: 'Member',
      discount: 'Join Free',
      color: '#6366F1',
      gradient1: '#6366F1',
      gradient2: '#4F46E5',
      icon: generateBaseSVG(),
      perks: ['Exclusive member discounts', 'Early sale access', 'Birthday rewards', 'Free shipping on orders'],
      badge: '✨',
      isSignup: true
    },
    bronze: {
      name: 'Bronze',
      discount: '10%',
      color: '#CD7F32',
      gradient1: '#CD7F32',
      gradient2: '#8B5A2B',
      icon: generateBronzeSVG(),
      perks: ['Free shipping', 'Early access', 'Birthday gift'],
      badge: '🥉'
    },
    silver: {
      name: 'Silver',
      discount: '20%',
      color: '#C0C0C0',
      gradient1: '#C0C0C0',
      gradient2: '#808080',
      icon: generateSilverSVG(),
      perks: ['Express shipping', 'Priority support', 'Exclusive events'],
      badge: '🥈'
    },
    gold: {
      name: 'Gold',
      discount: '30%',
      color: '#FFD700',
      gradient1: '#FFD700',
      gradient2: '#FFA500',
      icon: generateGoldSVG(),
      perks: ['Overnight shipping', 'VIP support', 'Personal stylist'],
      badge: '🥇'
    }
  };

  const tierData = tiers[tier.toLowerCase()] || tiers.bronze;

  res.setHeader('Content-Type', 'text/html');
  res.send(generateModalHTML(tierData));
});

function generateBaseSVG() {
  return `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#4F46E5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4338CA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Gift box base -->
      <rect x="35" y="55" width="50" height="45" fill="url(#baseGrad)" stroke="#3730A3" stroke-width="2" rx="3"/>
      <!-- Ribbon vertical -->
      <rect x="55" y="55" width="10" height="45" fill="#818CF8" opacity="0.8"/>
      <!-- Ribbon horizontal -->
      <rect x="35" y="72" width="50" height="10" fill="#818CF8" opacity="0.8"/>
      <!-- Bow -->
      <path d="M 45 45 Q 35 35 40 25 Q 45 30 50 25 Q 55 20 60 25 Q 65 30 70 25 Q 75 35 65 45 Q 60 50 60 55 L 50 55 Q 50 50 45 45 Z"
            fill="#C7D2FE"
            stroke="#3730A3"
            stroke-width="1.5"/>
      <!-- Sparkles -->
      <circle cx="30" cy="40" r="2" fill="#FCD34D" opacity="0.9"/>
      <circle cx="90" cy="50" r="2" fill="#FCD34D" opacity="0.9"/>
      <circle cx="25" cy="70" r="2" fill="#FCD34D" opacity="0.9"/>
      <circle cx="95" cy="80" r="2" fill="#FCD34D" opacity="0.9"/>
    </svg>
  `;
}

function generateBronzeSVG() {
  return `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#CD7F32;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#B8753D;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B5A2B;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M60 10 L95 25 L95 60 Q95 85 60 105 Q25 85 25 60 L25 25 Z" 
            fill="url(#bronzeGrad)" 
            stroke="#6B4423" 
            stroke-width="2"/>
      <path d="M60 35 L65 50 L80 52 L70 62 L73 77 L60 69 L47 77 L50 62 L40 52 L55 50 Z" 
            fill="#FFE4B5" 
            opacity="0.8"/>
      <text x="60" y="70" font-family="Arial" font-size="24" font-weight="bold" 
            fill="#FFE4B5" text-anchor="middle">3</text>
    </svg>
  `;
}

function generateSilverSVG() {
  return `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#C0C0C0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#A8A8A8;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M60 10 L95 25 L95 60 Q95 85 60 105 Q25 85 25 60 L25 25 Z" 
            fill="url(#silverGrad)" 
            stroke="#909090" 
            stroke-width="2"/>
      <path d="M60 30 L63 38 L72 39 L66 45 L68 54 L60 49 L52 54 L54 45 L48 39 L57 38 Z" 
            fill="#FFFFFF" opacity="0.9"/>
      <path d="M45 55 L47 60 L52 61 L48 65 L49 70 L45 67 L41 70 L42 65 L38 61 L43 60 Z" 
            fill="#FFFFFF" opacity="0.7"/>
      <path d="M75 55 L77 60 L82 61 L78 65 L79 70 L75 67 L71 70 L72 65 L68 61 L73 60 Z" 
            fill="#FFFFFF" opacity="0.7"/>
      <text x="60" y="90" font-family="Arial" font-size="20" font-weight="bold" 
            fill="#FFFFFF" text-anchor="middle">2</text>
    </svg>
  `;
}

function generateGoldSVG() {
  return `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
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
      </defs>
      <path d="M60 10 L95 25 L95 60 Q95 85 60 105 Q25 85 25 60 L25 25 Z" 
            fill="url(#goldGrad)" 
            stroke="#CC8800" 
            stroke-width="2"/>
      <ellipse cx="50" cy="35" rx="25" ry="20" fill="url(#goldShine)" opacity="0.6"/>
      <path d="M45 40 L48 50 L60 45 L72 50 L75 40 L70 48 L60 43 L50 48 Z" 
            fill="#FFEF00" stroke="#CC8800" stroke-width="1"/>
      <path d="M60 50 L66 62 L79 64 L69.5 73.5 L72 87 L60 80 L48 87 L50.5 73.5 L41 64 L54 62 Z" 
            fill="#FFFFFF" opacity="0.95" stroke="#FFD700" stroke-width="1"/>
      <text x="60" y="73" font-family="Arial" font-size="24" font-weight="bold" 
            fill="#CC8800" text-anchor="middle">1</text>
      <circle cx="35" cy="30" r="2" fill="#FFFFFF" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="85" cy="35" r="2" fill="#FFFFFF" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
}

function generateModalHTML(tierData) {
  return `
    <!-- Modal Overlay -->
    <div class="loyalty-modal-overlay" style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 40px;
      z-index: 10000;
      animation: fadeIn 0.3s ease-out;
    " onclick="if(event.target === this) this.remove()">
      
      <!-- Modal Card -->
      <div class="loyalty-modal-card" style="
        background: white;
        width: 500px;
        height: 500px;
        max-width: 90vw;
        max-height: 90vh;
        border-radius: 16px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        position: relative;
        animation: slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      " onclick="event.stopPropagation()">
        
        <!-- Close button -->
        <button style="
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.5);
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s;
        " 
        onmouseover="this.style.background='rgba(0,0,0,0.8)'; this.style.transform='rotate(90deg)'"
        onmouseout="this.style.background='rgba(0,0,0,0.5)'; this.style.transform='rotate(0deg)'"
        onclick="document.querySelector('.loyalty-modal-overlay').remove()">
          ×
        </button>
        
        <!-- Colored header section -->
        <div style="
          background: linear-gradient(135deg, ${tierData.gradient1}, ${tierData.gradient2});
          padding: 25px 20px;
          text-align: center;
        ">
          <!-- SVG Badge -->
          <div style="margin-bottom: 8px;">
            ${tierData.icon}
          </div>
          
          <!-- Tier name -->
          <h2 style="
            color: white;
            margin: 0;
            font-size: 1.5em;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">
            ${tierData.badge} ${tierData.name} Member
          </h2>
        </div>
        
        <!-- White content section -->
        <div style="
          background: white;
          flex: 1;
          padding: 30px 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        ">
          <!-- Discount badge -->
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="
              background: linear-gradient(135deg, ${tierData.gradient1}, ${tierData.gradient2});
              color: white;
              display: inline-block;
              padding: 12px 32px;
              border-radius: 25px;
              font-size: 2em;
              font-weight: 800;
              box-shadow: 0 4px 15px ${tierData.color}40;
            ">
              ${tierData.isSignup ? tierData.discount : tierData.discount + ' OFF'}
            </div>
          </div>

          <!-- Perks list -->
          <div style="flex: 1; margin-bottom: 20px;">
            ${tierData.isSignup ? `
              <p style="
                text-align: center;
                color: #333;
                font-size: 1em;
                margin: 0 0 20px 0;
                font-weight: 600;
                line-height: 1.5;
              ">
                Join our loyalty program and unlock amazing rewards!
              </p>
            ` : ''}
            <p style="
              text-align: center;
              color: #666;
              font-size: 0.9em;
              margin: 0 0 15px 0;
              font-weight: 600;
            ">
              ${tierData.isSignup ? 'MEMBER BENEFITS' : 'YOUR EXCLUSIVE BENEFITS'}
            </p>
            ${tierData.perks.map(perk => `
              <div style="
                padding: 6px 0;
                display: flex;
                align-items: center;
                font-size: 0.85em;
              ">
                <span style="
                  color: ${tierData.color};
                  margin-right: 8px;
                  font-size: 1.2em;
                  font-weight: bold;
                ">✓</span>
                <span style="color: #444;">${perk}</span>
              </div>
            `).join('')}
          </div>
          
          <!-- CTA Button -->
          <div>
            <button onclick="
              window.dispatchEvent(new CustomEvent('loyaltyOfferClick', {detail: {tier: '${tierData.name}'}}));
              document.querySelector('.loyalty-modal-overlay').remove();
            " style="
              width: 100%;
              background: linear-gradient(135deg, ${tierData.gradient1}, ${tierData.gradient2});
              color: white;
              border: none;
              padding: 16px;
              border-radius: 12px;
              font-size: 1em;
              font-weight: 700;
              cursor: pointer;
              box-shadow: 0 4px 15px ${tierData.color}40;
              transition: all 0.3s ease;
              text-transform: uppercase;
              letter-spacing: 1px;
            " 
            onmouseover="
              this.style.transform='translateY(-2px)';
              this.style.boxShadow='0 6px 20px ${tierData.color}60';
            " 
            onmouseout="
              this.style.transform='translateY(0)';
              this.style.boxShadow='0 4px 15px ${tierData.color}40';
            ">
              ${tierData.isSignup ? 'Join Free →' : 'Shop Now →'}
            </button>

            <p style="
              text-align: center;
              margin: 12px 0 0 0;
              color: #999;
              font-size: 0.75em;
            ">
              ${tierData.isSignup ? 'No credit card required • Start earning rewards today' : 'Applied automatically at checkout'}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInScale {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .loyalty-modal-card button:active {
        transform: translateY(0) scale(0.98) !important;
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
