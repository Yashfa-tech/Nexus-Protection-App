(function (global) {

  "use strict";
  console.log("hhhhhhh tamplate11111111111 haaaaa");

  // Template class definition - no auto-initialization

  // Self-contained color utility functions
  const colorUtils = {
    adjustColor: function (hex, amount = 0.2) {
      if (!hex || typeof hex !== "string") return "#333333";
      try {
        let color = hex.replace("#", "");
        if (color.length === 3) {
          color = color.split("").map(char => char + char).join("");
        }
        if (color.length !== 6) return "#333333";
        const num = parseInt(color, 16);
        const amt = Math.round(255 * amount);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
      } catch (e) {
        return "#333333";
      }
    },
    getDarkerColor: function (hex, amount = 0.2) {
      if (!hex || typeof hex !== "string") return "#333333";
      try {
        let color = hex.replace("#", "");
        if (color.length === 3) {
          color = color.split("").map(char => char + char).join("");
        }
        if (color.length !== 6) return "#333333";
        const num = parseInt(color, 16);
        const amt = Math.round(255 * amount);
        const R = Math.max(0, Math.min(255, (num >> 16) - amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) - amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) - amt));
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
      } catch (e) {
        return "#333333";
      }
    },
    getLighterColor: function (hex, amount = 0.2) {
      if (!hex || typeof hex !== "string") return "#cccccc";
      try {
        let color = hex.replace("#", "");
        if (color.length === 3) {
          color = color.split("").map(char => char + char).join("");
        }
        if (color.length !== 6) return "#cccccc";
        const num = parseInt(color, 16);
        const amt = Math.round(255 * amount);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
      } catch (e) {
        return "#cccccc";
      }
    },
    hexToRgbaString: function (hex, alpha = 1) {
      if (!hex || typeof hex !== "string") return "rgba(0,0,0,1)";
      try {
        let color = hex.replace("#", "");
        if (color.length === 3) {
          color = color.split("").map(char => char + char).join("");
        }
        if (color.length !== 6) return "rgba(0,0,0,1)";
        const r = parseInt(color.slice(0, 2), 16);
        const g = parseInt(color.slice(2, 4), 16);
        const b = parseInt(color.slice(4, 6), 16);
        return `rgba(${r},${g},${b},${alpha})`;
      } catch (e) {
        return "rgba(0,0,0,1)";
      }
    }
  };
  const { adjustColor, getDarkerColor, getLighterColor, hexToRgbaString } = colorUtils;

  const d = (sel, root = document) => root.querySelector(sel);
  const da = (sel, root = document) => root.querySelectorAll(sel);

  const SVG = {
    shield: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    users: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    lightning: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    star: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    check: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  function ensureInstance(o) {
    if (!(o instanceof Object)) return {};
    return o;
  }

  function Template(containerId, options = {}) {
    const self = ensureInstance(this);
    self.instanceId = `${containerId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Template container with ID "${containerId}" not found`);
      return self || {};
    }

    const DEFAULT_SETTINGS = {
      activeTemplate: "Template1",
      isEnabled: true,
      template: {
        title: "Shipping Protection",
        description: "100% guarantee & protect your order from damage, loss, or theft",
        isEnabled: true,
      },
      template2: {
        title: "Advanced Protection",
        description: "Comprehensive coverage for your order",
        bulletPoint1: "Secure Coverage",
        bulletPoint2: "Instant Claims",
        bulletPoint3: "Trusted by 50k+",
        protectionAddedText: "Protection Added",
        protectionMessageTitle: "Your order is now protected",
        protectionMessageSubtext: "If your package is lost, stolen, or damaged, we'll replace it or provide a full refund — no questions asked.",
        isEnabled: true,
      },
      template3: {
        title: "Premium Protection",
        description: "Elite protection service for your orders",
        confirmationMessage: "Your order is now protected!",
        badgeText: "Protected",
        isEnabled: true,
      },
      selectionMode: "toggle",
      iconAsset: {
        type: "logo",
        name: "logo1",
        url: null,
      },
      iconStyle: {
        size: 32,
        color: "#000000",
        background: "transparent",
        borderColor: "#E5E7EB",
        borderRadius: 9999,
        autoTheme: false,
      },
      buttonBlock: {
        buttonLabel: "Protected checkout + $12.11",
        buttonHref: "https://example.com/cta",
        paragraph: "One-line supporting text below the button.",
      },
      enableProtectionControl: {
        enabled: true,
        backgroundColor: "#1773B0",
        textColor: "#ffffff",
        disabledBackgroundColor: "#d1d5db",
        disabledTextColor: "#6b7280",
        enabledText: "Protection Enabled",
        disabledText: "Protected checkout + $12.11",
        showText: false,
        borderRadius: 24,
        borderWidth: 0,
        borderColor: "transparent",
        fontSize: 12,
        padding: "6px 12px",
        transition: "all 0.3s ease",
        hoverEffect: true,
        activeEffect: true,
      },
      logoSettings: {
        showLogo: true,
        logoUrl: "",
        alt: "Brand Logo",
        maxWidth: 160,
        maxHeight: 48,
      },
      colors: {
        useGradient: false,
        backgroundColor: "#ff0000",
        textColor: "#000000",
        svgColor: "#000000",
        toggleEnabled: "#1773B0",
        toggleDisabled: "#e5e7eb",
        checkboxEnabled: "#1773B0",
        checkboxDisabled: "#e5e7eb",
        buttonBg: "#1773B0",
        buttonText: "#ffffff",
        upsellIconUrl: null,
      },
    };

    const mergedOptions = {
      activeTemplate: options.activeTemplate || DEFAULT_SETTINGS.activeTemplate,
      isEnabled: options.isEnabled !== undefined ? options.isEnabled : DEFAULT_SETTINGS.isEnabled,
      selectionMode: options.selectionMode || DEFAULT_SETTINGS.selectionMode,
      iconAsset: { ...DEFAULT_SETTINGS.iconAsset, ...options.iconAsset },
      iconStyle: { ...DEFAULT_SETTINGS.iconStyle, ...options.iconStyle },
      buttonBlock: { ...DEFAULT_SETTINGS.buttonBlock, ...options.buttonBlock },
      enableProtectionControl: { ...DEFAULT_SETTINGS.enableProtectionControl, ...options.enableProtectionControl },
      logoSettings: { ...DEFAULT_SETTINGS.logoSettings, ...options.logoSettings },
      colors: { ...DEFAULT_SETTINGS.colors, ...options.colors },
    };

    const activeTemplate = mergedOptions.activeTemplate;
    const templateContent = DEFAULT_SETTINGS[activeTemplate] || DEFAULT_SETTINGS.template;
    const contentOptions = {};
    Object.keys(templateContent).forEach(key => {
      contentOptions[key] = options[key] !== undefined ? options[key] : templateContent[key];
    });

    let state = {
      containerId,
      container,
      activeTemplate: mergedOptions.activeTemplate,
      isEnabled: mergedOptions.isEnabled,
      protectionPrice: +options.protectionPrice || 0,
      onToggle: options.onToggle || (() => { }),
      title: contentOptions.title,
      description: contentOptions.description,
      confirmationMessage: contentOptions.confirmationMessage || "Your order is now protected!",
      badgeText: contentOptions.badgeText || "Protected",
      bulletPoint1: contentOptions.bulletPoint1 || "Secure Coverage",
      bulletPoint2: contentOptions.bulletPoint2 || "Instant Claims",
      bulletPoint3: contentOptions.bulletPoint3 || "Trusted by 50k+",
      bulletPoints: (() => {
        const bulletPoints = options.bulletPoints || [
          { text: contentOptions.bulletPoint1 || "Secure Coverage", icon: "shield" },
          { text: contentOptions.bulletPoint2 || "Instant Claims", icon: "lightning" },
          { text: contentOptions.bulletPoint3 || "Trusted by 50k+", icon: "star" }
        ];
        return bulletPoints;
      })(),
      protectionAddedText: contentOptions.protectionAddedText || "Protection Added",
      protectionMessage: {
        title: contentOptions.protectionMessageTitle || "Your order is now protected",
        subtext: contentOptions.protectionMessageSubtext || "If your package is lost, stolen, or damaged, we'll replace it or provide a full refund — no questions asked."
      },
      additionalParagraphs: options.additionalParagraphs || [],
      colors: mergedOptions.colors,
      selectionMode: mergedOptions.selectionMode,
      enableProtectionControl: mergedOptions.enableProtectionControl,
      logoSettings: mergedOptions.logoSettings,
      iconAsset: mergedOptions.iconAsset,
      iconStyle: mergedOptions.iconStyle,
      buttonBlock: mergedOptions.buttonBlock,
    };

    container._templateInstance = api;

    function iconHTML() {
      // UPSELL MODE - Always show green plus icon
      if (state.colors.upsellIconUrl) {
        return `
          <div class="T1_icon-custom T1_icon-uploaded" data-logo-category="upsell">
            <img src="${state.colors.upsellIconUrl}" style="width:${state.iconStyle.size + 10}px;height:${state.iconStyle.size + 10}px;object-fit:cover;border-radius:6px" alt="Upsell Icon"/>
            <div class="T1_icon-overlay" style="opacity:0"></div>
          </div>`;
      } else {
        const defaultUpsellImage = "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='8' fill='%233AAF3C'/%3E%3Cpath d='M20 10V30M10 20H30' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";
        return `
          <div class="T1_icon-custom" data-logo-category="upsell-default">
            <img src="${defaultUpsellImage}" style="width:${state.iconStyle.size + 10}px;height:${state.iconStyle.size + 10}px;object-fit:cover;border-radius:6px" alt="Default Upsell Icon"/>
          </div>`;
      }
    }

    function svg(name) {
      const svgContent = SVG[name] || SVG.shield;
      if (!svgContent) {
        return SVG.shield || '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#ccc"/></svg>';
      }
      return svgContent;
    }

    function logoHTML() {
      const { showLogo, logoUrl, alt, maxWidth, maxHeight } = state.logoSettings;
      if (!showLogo || !logoUrl) return "";
      return `
        <div class="T1_logo-container" style="max-width:${maxWidth}px;max-height:${maxHeight}px;overflow:hidden;margin-right:8px">
          <img src="${logoUrl}" alt="${alt}" style="max-width:100%;max-height:100%;object-fit:contain"/>
        </div>`;
    }

    function checkboxHTML() {
      const darkerColorFn = getDarkerColor;
      const darkerTextColor = darkerColorFn(state.colors.textColor);
      return `
        <input type="checkbox" class="T1_checkbox" id="T1_protection_checkbox_${self.instanceId || Date.now()}" ${state.isEnabled ? "checked" : ""}/>
        <label for="T1_protection_checkbox_${self.instanceId || Date.now()}" style="cursor:pointer;margin-left:4px;font-size:12px;color:${darkerTextColor};"></label>
      `;
    }

    function toggleHTML() {
      return `
        <div class="T1_toggle">
        <input type="checkbox" class="T1_toggle-checkbox" id="T1_toggle_checkbox_${self.instanceId || Date.now()}" name="T1_toggle_${self.instanceId || Date.now()}" aria-label="Enable protection" ${state.isEnabled ? "checked" : ""}>
        <div class="toggle-track">
            <div class="toggle-handle"></div>
        </div>
        </div>
      `;
    }

    function bulletPointsHTML() {
      const svgColor = state.colors.svgColor || state.colors.textColor || "#000000";
      const points = state.bulletPoints.map(p => ({
        text: p.text || p,
        icon: p.icon || null
      }));
      if (points.length === 0 || points.filter(p => p.icon).length === 0) {
        points.push(
          { text: "Test Shield", icon: "shield" },
          { text: "Test Lightning", icon: "lightning" },
          { text: "Test Star", icon: "star" }
        );
      }
      const html = `
        <div class="T1_inline-points">
          ${points.map(p => `
            <div class="T1_inline-point">
              ${p.icon ? `
                <span class="T1_bullet-icon">
                  ${svg(p.icon).replace(/stroke="currentColor"/g, `stroke="${svgColor}"`)}
                </span>
              ` : ''}
              <span>${p.text}</span>
            </div>
          `).join('')}
        </div>`;
      return html;
    }

    function injectStyles() {
      const id = "T1_template-styles";
      const existingStyle = d(`#${id}`);
      if (existingStyle) {
        existingStyle.remove();
      }
      const allTemplateStyles = da('[id*="T1_template"]');
      if (allTemplateStyles && allTemplateStyles.length > 0) {
        allTemplateStyles.forEach(style => {
          if (style && style.remove) {
            style.remove();
          }
        });
      }
      const s = document.createElement("style");
      s.id = id;
      const c = state.colors;
      const backgroundColor = c.backgroundColor;
      const textColor = c.textColor;
      const darkerColorFn = getDarkerColor;
      const lighterColorFn = getLighterColor;
      const darkerTextColor = darkerColorFn(textColor, 0.2);
      const svgColor = c.svgColor || textColor;

      s.textContent = `
    .T1_shipping-protection {
      background: ${c.backgroundColor};
      border-radius: 20px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      color: ${darkerTextColor};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02);
      overflow: visible;
    }

    .T1_shipping-protection svg, .T1_template2-container svg, .T1_template3-container svg {
      color: ${svgColor} !important;
      fill: ${svgColor} !important;
      stroke: ${svgColor} !important;
      max-width: 100% !important;
      max-height: 100% !important;
    }
    
    .T1_icon-container, .T1_icon-container-message {
      background: transparent;
    }
    
    .T1_icon-container-message {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .T1_icon-container {
      width: ${state.iconStyle.size + 10}px;
      height: ${state.iconStyle.size + 10}px;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08) !important;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      position: relative;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .T1_icon-container .T1_icon-custom {
      width: ${state.iconStyle.size + 10}px !important;
      height: ${state.iconStyle.size + 10}px !important;
      max-width: 100% !important;
      max-height: 100% !important;
    }
    
    .T1_icon-container .T1_icon-custom img {
      width: ${state.iconStyle.size + 10}px !important;
      height: ${state.iconStyle.size + 10}px !important;
      max-width: 100% !important;
      max-height: 100% !important;
      object-fit: cover !important;
      border-radius: 6px !important;
    }
    
    .T1_content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0;
      position: relative;
    }
    
    .T1_content, .T1_inline-point, .T1_protection-message, .T1_bullet-points, .T1_additional-paragraphs {
      color: ${darkerTextColor};
    }
    
    .T1_title {
      font-weight: 700;
      font-size: 16px;
      color: ${darkerTextColor};
      margin: 0;
      letter-spacing: -0.02em;
      line-height: 1.25;
    }
    
    .T1_description {
      font-weight: 500;
      font-size: 14px;
      color: ${darkerTextColor};
      margin: 0;
      line-height: 1.4;
      opacity: 0.85;
    }
    
    .T1_toggle {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      width: 52px;
      height: 28px;
      accent-color: ${c.toggleEnabled};
      transition: transform 0.2s ease;
    }

    .T1_toggle input[type="checkbox"] {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      margin: 0;
      cursor: pointer;
      z-index: 2;
    }
    
    .T1_toggle .toggle-track {
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      background: ${c.toggleDisabled};
      position: absolute;
      transition: background 0.2s ease;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    
    .T1_toggle input[type="checkbox"]:checked + .toggle-track {
      background: ${c.toggleEnabled};
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.12);
    }
    
    .T1_toggle .toggle-handle {
      position: absolute;
      width: 22px;
      height: 22px;
      background: linear-gradient(135deg, #ffffff, #f8f9fa);
      border-radius: 50%;
      top: 3px;
      left: 3px;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
    }
    
    .T1_toggle input[type="checkbox"]:checked + .toggle-track .toggle-handle {
      transform: translateX(24px);
    }
    
    .T1_template2-container, .T1_template3-container {
      background: ${c.backgroundColor};
      border-radius: 24px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      color: ${darkerTextColor};
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: box-shadow 0.2s ease;
      position: relative;
    }

    .T1_main-widget {
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      z-index: 1;
      padding: 4px 0;
    }
    
    .T1_controls-section {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
      padding: 2px 0;
    }
    
    .T1_inline-points {
      display: flex !important;
      justify-content: space-between;
      gap: 16px;
      margin: 16px 0;
      position: relative;
      z-index: 1;
    }
    
    .T1_inline-point {
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 600;
      font-size: 13px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      position: relative;
      overflow: hidden;
    }

    .T1_inline-point svg {
      width: ${Math.min(state.iconStyle.size * 0.6, 24)}px !important;
      height: ${Math.min(state.iconStyle.size * 0.6, 24)}px !important;
      max-width: 24px !important;
      max-height: 24px !important;
      color: ${svgColor} !important;
      stroke: ${svgColor} !important;
      fill: none !important;
      stroke-width: 2 !important;
      display: inline-block !important;
    }
    
    .T1_bullet-icon {
      flex-shrink: 0;
      display: inline-flex !important;
      overflow: hidden;
    }
    
    .T1_protection-added {
      font-weight: 500;
      color: ${darkerTextColor};
    }
    
    .T1_protection-added,
    .T1_protection-message {
      border-radius: 18px;
      padding: 20px 22px;
      display: flex;
      background: ${c.backgroundColor};
      gap: 16px;
      align-items: flex-start;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 1;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .T1_protection-added, .T1_protection-message-title {
      font-size: 14px;
    }
    
    .T1_protection-message-title {
      font-weight: 600;
      color: ${darkerTextColor};
      margin: 0 0 4px;
    }
    
    .T1_protection-message-subtext {
      font-size: 12px;
      color: ${darkerTextColor};
      line-height: 1.4;
      margin: 0;
      opacity: 0.8;
    }
    
    .T1_confirmation-message {
      font-size: 12px;
      color: ${darkerTextColor};
      font-weight: 500;
      display: none;
      transition: opacity 0.2s ease;
    }
    
    .T1_confirmation-message.T1_visible {
      display: block;
    }
    
    .T1_badge {
    //   background: ${c.buttonBg};
    //   color: ${c.buttonText};
      background: #817f7f;
      color: #1a1a1a;
      position: absolute;
      top: -35px;
      right: 9px;
      font-size: 10px;
      font-weight: 800;
      padding: 7px 15px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      display: none;
      transform: scale(0.95);
      transition: transform 0.3s ease, opacity 0.3s ease;
      z-index: 10;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    .T1_badge.T1_visible {
      display: block;
      margin-top: 13px;
    }
    
    .T1_shipping-protection .T1_checkbox[type="checkbox"],
    .T1_template2-container .T1_checkbox[type="checkbox"],
    .T1_template3-container .T1_checkbox[type="checkbox"] {
      width: 22px !important;
      height: 22px !important;
      accent-color: ${c.checkboxEnabled || '#1773B0'} !important;
      cursor: pointer !important;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      background: #ffffff;
      position: relative;
      transition: transform 0.2s ease, border-color 0.2s ease;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    }
    
    .T1_shipping-protection .T1_checkbox[type="checkbox"]:checked,
    .T1_template2-container .T1_checkbox[type="checkbox"]:checked,
    .T1_template3-container .T1_checkbox[type="checkbox"]:checked {
      background: ${c.checkboxEnabled || '#1773B0'} !important;
      border-color: ${c.checkboxEnabled || '#1773B0'} !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .T1_shipping-protection .T1_checkbox[type="checkbox"]:checked::after,
    .T1_template2-container .T1_checkbox[type="checkbox"]:checked::after,
    .T1_template3-container .T1_checkbox[type="checkbox"]:checked::after {
      content: '✓';
      color: white;
      font-size: 13px;
      position: absolute;
      top: -1px;
      left: 3px;
      font-weight: 900;
      z-index: 1;
    }
    
    .T1_button-mode {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      padding: 28px;
      border-radius: 24px;
      background: ${c.backgroundColor};
      transition: box-shadow 0.2s ease;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
      position: relative;
      overflow: hidden;
    }

    .T1_protection-button {
      background: ${c.buttonBg};
      color: ${c.buttonText};
      border: 0;
      border-radius: 16px;
      padding: 16px 32px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      letter-spacing: 0.01em;
      position: relative;
      overflow: hidden;
    }
    
    .T1_protection-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    .T1_protection-button:active {
      transform: translateY(1px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    
    .T1_button-description {
      font-size: 13px;
      color: ${darkerTextColor};
      margin: 0;
      text-align: center;
      line-height: 1.5;
      font-weight: 500;
      opacity: 0.9;
    }
    
    .T1_logo-container {
      max-width: ${state.logoSettings.maxWidth}px;
      max-height: ${state.logoSettings.maxHeight}px;
      overflow: hidden;
      margin-right: 16px;
      border-radius: 12px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      position: relative;
    }

    .T1_logo-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: all 0.2s ease;
    }
    
    .T1_icon-custom {
      width: ${state.iconStyle.size}px !important;
      height: ${state.iconStyle.size}px !important;
      max-width: 100%;
      max-height: 100%;
      color: ${state.iconStyle.color};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .Template-wrapper {
      margin: 30px 10px;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .T1_shipping-protection {
        padding: 20px;
        gap: 16px;
        border-radius: 18px;
      }
      .T1_template2-container, .T1_template3-container {
        padding: 22px;
        gap: 16px;
        border-radius: 20px;
      }
      .T1_main-widget {
        gap: 16px;
      }
      .T1_controls-section {
        gap: 14px;
      }
      .T1_inline-points {
        flex-direction: column;
        gap: 12px;
      }
      .T1_inline-point {
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 12px;
      }
      .T1_title {
        font-size: 15px;
      }
      .T1_description {
        font-size: 13px;
      }
      .T1_protection-button {
        padding: 14px 24px;
        font-size: 14px;
        border-radius: 14px;
      }
      .T1_icon-container {
        width: ${Math.max(56, state.iconStyle.size + 24)}px;
        height: ${Math.max(56, state.iconStyle.size + 24)}px;
        border-radius: 16px;
      }
      .T1_toggle {
        width: 48px;
        height: 26px;
      }
      .T1_toggle .toggle-handle {
        width: 20px;
        height: 20px;
      }
      .T1_toggle input[type="checkbox"]:checked + .toggle-track .toggle-handle {
        transform: translateX(22px);
      }
    }
    
    @media (max-width: 480px) {
      .T1_shipping-protection {
        padding: 18px;
        gap: 14px;
        flex-direction: column;
        text-align: center;
        border-radius: 16px;
      }
      .T1_template2-container, .T1_template3-container {
        padding: 20px;
        gap: 14px;
        border-radius: 18px;
      }
      .T1_main-widget {
        flex-direction: column;
        gap: 14px;
        text-align: center;
      }
      .T1_controls-section {
        justify-content: center;
        gap: 12px;
      }
      .T1_inline-points {
        gap: 10px;
      }
      .T1_inline-point {
        padding: 8px 12px;
        font-size: 11px;
      }
      .T1_protection-added,
      .T1_protection-message {
        padding: 16px 18px;
        gap: 12px;
        border-radius: 16px;
      }
      .T1_button-mode {
        padding: 24px;
        gap: 14px;
        border-radius: 20px;
      }
      .T1_title {
        font-size: 14px;
      }
      .T1_description {
        font-size: 12px;
      }
    }
  `;
      document.head.appendChild(s);
    }

    function render() {
      if (state.selectionMode === "button") return renderButtonMode();
      renderTemplate();
    }

    function renderButtonMode() {
      state.container.innerHTML = `
        <div class="T1_button-mode">
          ${logoHTML()}
          <a href="${state.buttonBlock.buttonHref}" class="T1_protection-button">${state.buttonBlock.buttonLabel}</a>
          <p class="T1_button-description">${state.buttonBlock.paragraph}</p>
        </div>`;
    }

    function renderTemplate() {
      const t = state.activeTemplate;
      if (t === "Template1" || t === "Template") return renderT1();
      if (t === "Template2") return renderT2();
      if (t === "Template3") return renderT3();
      return renderT1();
    }

    function renderT1() {
      state.container.innerHTML = `
        <div class="T1_shipping-protection">
          ${logoHTML()}
          <div class="T1_icon-container">${iconHTML()}</div>
 
