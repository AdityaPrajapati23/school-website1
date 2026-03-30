/* =============================================================
   ui.js — UI Rendering
   ============================================================= */

const UI = (() => {

  /* ----------------------------------------------------------
     Ticker
     ---------------------------------------------------------- */
  function renderTicker() {
    const el = document.getElementById("ticker-items");
    if (!el) return;
    const items = DB.getAnnouncements();
    const all   = [...items, ...items];
    el.innerHTML = all.map(a =>
      `<div class="ticker-item">
         <div class="ticker-dot"></div>${a}
       </div>`
    ).join("");
  }

  /* ----------------------------------------------------------
     Classes Grid
     ---------------------------------------------------------- */
  function renderClasses() {
    const el = document.getElementById("classes-grid");
    if (!el) return;
    el.innerHTML = DB.getClasses().map(c =>
      `<div class="class-card fade-up">
         <span class="cc-icon">${c.emoji}</span>
         <div class="cc-name">${c.name}</div>
         <div class="cc-sub">${c.sub}</div>
       </div>`
    ).join("");
  }

  /* ----------------------------------------------------------
     Subjects Grid
     ---------------------------------------------------------- */
  function renderSubjects() {
    const el = document.getElementById("subjects-grid");
    if (!el) return;
    el.innerHTML = DB.getSubjects().map(s =>
      `<div class="subject-item">
         <span class="subject-icon">${s.icon}</span>
         <span class="subject-name">${s.name}</span>
       </div>`
    ).join("");
  }

  /* ----------------------------------------------------------
     Academic Calendar
     ---------------------------------------------------------- */
  function renderCalendar() {
    const el = document.getElementById("calendar-body");
    if (!el) return;
    el.innerHTML = DB.getCalendar().map(c =>
      `<tr>
         <td><strong>${c.month}</strong></td>
         <td>${c.event}</td>
         <td style="font-size:.85rem;color:var(--gray-500)">${c.details}</td>
         <td><span class="badge badge-blue">${c.status}</span></td>
       </tr>`
    ).join("");
  }

  /* ----------------------------------------------------------
     Fee Table
     ---------------------------------------------------------- */
  function renderFeeTable() {
    const el = document.getElementById("fee-body");
    if (!el) return;
    el.innerHTML = DB.getFeeStructure().map(f =>
      `<tr>
         <td><strong>${f.cls}</strong></td>
         <td style="color:var(--primary);font-weight:700">${f.admission}</td>
         <td style="color:var(--success);font-weight:700">${f.monthly}</td>
         <td style="color:var(--gray-700);font-weight:700">${f.annual}</td>
       </tr>`
    ).join("");
  }

  /* ----------------------------------------------------------
     Gallery
     ---------------------------------------------------------- */
  function renderGallery(cat = "all") {
    const el = document.getElementById("gallery-container");
    if (!el) return;
    const allItems = DB.getGallery();
    let html = "";

    if (allItems.length === 0) {
      el.innerHTML = `
        <div style="text-align:center;padding:80px 20px;color:var(--gray-400)">
          <div style="font-size:5rem;margin-bottom:20px">🖼️</div>
          <h3 style="color:var(--gray-500)">No photos yet</h3>
          <p>Admin can upload photos from Admin Panel → Gallery tab.</p>
        </div>`;
      return;
    }

    if (cat === "all") {
      ["events","sports","academics","cultural"].forEach(category => {
        const catItems = allItems.filter(g => g.category === category);
        if (catItems.length > 0) {
          const catLabels = {
            events:    "🎉 Events",
            sports:    "⚽ Sports",
            academics: "📚 Academics",
            cultural:  "🎭 Cultural"
          };
          html += `
            <div class="gallery-category-group fade-up">
              <h3 class="gallery-category-title">
                📂 ${catLabels[category] || category}
                <span class="badge badge-blue"
                  style="font-size:.7rem;margin-left:8px;vertical-align:middle">
                  ${catItems.length} photo${catItems.length > 1 ? "s" : ""}
                </span>
              </h3>
              <div class="gallery-grid">
                ${catItems.map(g => _galleryItemHTML(g)).join("")}
              </div>
            </div>`;
        }
      });

      if (!html) {
        html = `
          <div style="text-align:center;padding:80px 20px;color:var(--gray-400)">
            <div style="font-size:5rem;margin-bottom:20px">🖼️</div>
            <h3 style="color:var(--gray-500)">No photos uploaded yet</h3>
            <p>Use Admin Panel to add photos.</p>
          </div>`;
      }
    } else {
      const filteredItems = allItems.filter(g => g.category === cat);
      if (filteredItems.length === 0) {
        html = `
          <div style="text-align:center;padding:80px 20px;color:var(--gray-400)">
            <div style="font-size:5rem;margin-bottom:20px">📭</div>
            <h3 style="color:var(--gray-500)">No photos in this category</h3>
          </div>`;
      } else {
        html = `<div class="gallery-grid">
          ${filteredItems.map(g => _galleryItemHTML(g)).join("")}
        </div>`;
      }
    }

    el.innerHTML = html;
    Utils.observeFadeElements();
  }

  function _galleryItemHTML(g) {
    if (g.image) {
      return `
        <div class="gallery-item" style="background:${g.bg || "#1e3a8a"}">
          <img src="${g.image}" alt="${g.caption}"
               style="width:100%;height:100%;object-fit:cover;
                      position:absolute;inset:0;display:block;">
          <div class="overlay">
            <span style="font-size:2rem">🔍</span>
            <p style="color:#fff;font-size:.85rem;font-weight:600;
                      text-align:center;padding:0 12px">${g.caption}</p>
            <span class="badge badge-blue"
                  style="font-size:.7rem;margin-top:4px">${g.category}</span>
          </div>
        </div>`;
    }
    return `
      <div class="gallery-item" style="background:${g.bg || "#1e3a8a"}">
        <div style="width:100%;height:100%;display:flex;flex-direction:column;
                    align-items:center;justify-content:center;
                    gap:12px;padding:16px;">
          <span style="font-size:4rem;line-height:1;
                        filter:drop-shadow(0 4px 8px rgba(0,0,0,.3))">
            ${g.emoji}
          </span>
          <p style="color:rgba(255,255,255,.95);font-size:.88rem;font-weight:700;
                    text-align:center;line-height:1.4;margin:0;padding:0 8px">
            ${g.caption}
          </p>
          <span style="background:rgba(255,255,255,.2);color:#fff;
                       padding:3px 10px;border-radius:99px;
                       font-size:.72rem;font-weight:700;letter-spacing:.05em">
            ${g.category}
          </span>
        </div>
        <div class="overlay">
          <span style="font-size:2rem">🔍</span>
          <p style="color:#fff;font-size:.85rem;font-weight:600;
                    text-align:center;padding:0 12px">${g.caption}</p>
        </div>
      </div>`;
  }

  /* ----------------------------------------------------------
     Notices
     ---------------------------------------------------------- */
  function renderNotices() {
    const el      = document.getElementById("notice-list");
    const quickEl = document.getElementById("notice-quick");
    if (!el) return;

    const catColors = {
      Event:    "badge-gold",
      Exam:     "badge-red",
      Holiday:  "badge-green",
      Admission:"badge-blue",
      Fee:      "badge-red",
      General:  "badge-blue"
    };

    el.innerHTML = DB.getNotices().map(n => {
      const { day, mon } = Utils.getMonthDay(n.date);
      return `
        <div class="notice-item">
          <div class="notice-date">
            <div class="day">${day}</div>
            <div class="mon">${mon}</div>
          </div>
          <div class="notice-body">
            <h4>${n.title}</h4>
            <p>${n.desc}</p>
            <div class="notice-actions">
              <span class="badge ${catColors[n.category] || "badge-blue"}">
                ${n.category}
              </span>
              ${n.hasPdf
                ? `<button class="btn btn-secondary btn-sm"
                     onclick="showToast('Downloading PDF...','success')">
                     📄 Download PDF
                   </button>`
                : ""}
            </div>
          </div>
        </div>`;
    }).join("");

    if (quickEl) {
      quickEl.innerHTML = DB.getNotices().slice(0, 5).map(n =>
        `<div class="nq-item" onclick="showToast('${n.title}','info')">
           <div class="nq-dot"></div>
           <div class="nq-text">${n.title}</div>
         </div>`
      ).join("");
    }
  }

  /* ----------------------------------------------------------
     Upcoming Events
     ---------------------------------------------------------- */
  function renderUpcomingEvents() {
    const el = document.getElementById("upcoming-events");
    if (!el) return;
    el.innerHTML = DB.getUpcomingEvents().map(ev =>
      `<div style="display:flex;align-items:center;gap:14px;
                   padding:10px 0;border-bottom:1px solid var(--gray-100)">
         <div style="background:var(--gradient);color:#fff;border-radius:8px;
                     padding:6px 10px;text-align:center;font-size:.8rem;
                     font-weight:800;min-width:48px;flex-shrink:0">
           ${ev.date}
         </div>
         <div style="display:flex;align-items:center;gap:8px">
           <span>${ev.icon}</span>
           <span style="font-size:.88rem;font-weight:600;
                        color:var(--gray-800)">${ev.event}</span>
         </div>
       </div>`
    ).join("");
  }

  /* ----------------------------------------------------------
     ✅ FACULTY — FIXED & COMPLETE
     ---------------------------------------------------------- */
  function renderFaculty(filterType = "all") {
    const el = document.getElementById("faculty-grid");
    if (!el) return;

    const allFaculty = DB.getFaculty();
    const filtered   = filterType === "all"
      ? allFaculty
      : allFaculty.filter(f => f.type === filterType);

    if (filtered.length === 0) {
      el.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;
                    padding:60px 20px;color:var(--gray-400)">
          <div style="font-size:4rem;margin-bottom:16px">👥</div>
          <h3 style="color:var(--gray-500);margin-bottom:8px">
            No staff in this category
          </h3>
          <p>Admin can add faculty from the Admin Panel → Faculty tab.</p>
        </div>`;
      return;
    }

    el.innerHTML = filtered.map(f => _facultyCardHTML(f)).join("");
    Utils.observeFadeElements();
  }

  function _facultyCardHTML(f) {
    const avatarContent = f.image
      ? `<img src="${f.image}" alt="${f.name}"
              style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : `<span style="font-size:2.8rem;line-height:1">${f.emoji || "👤"}</span>`;

    const typeBadgeMap = {
      management: "👔 Management",
      primary:    "📚 Teacher",
      preprimary: "🧸 Pre-Primary",
      sports:     "⚽ Sports",
      arts:       "🎨 Arts",
      support:    "🛠️ Support"
    };

    return `
      <div class="faculty-card fade-up">

        <!-- Colored Top Header -->
        <div class="faculty-card-top" style="background:${f.bg || "#1e3a8a"}">
          <div class="faculty-type-badge">
            ${typeBadgeMap[f.type] || "👤 Staff"}
          </div>
          <!-- Avatar overlapping top/body -->
          <div class="faculty-avatar">
            ${avatarContent}
          </div>
        </div>

        <!-- Card Body -->
        <div class="faculty-card-body">

          <!-- Name & Designation -->
          <h3 class="faculty-name">${f.name}</h3>
          <p class="faculty-designation">${f.designation}</p>

          <!-- Subject Pill -->
          <div class="faculty-subject">
            <span>📖</span> ${f.subject}
          </div>

          <!-- Meta Info -->
          <div class="faculty-meta">
            <div class="faculty-meta-item">
              <span class="fmi-icon">🎓</span>
              <span class="fmi-text">${f.qualification}</span>
            </div>
            <div class="faculty-meta-item">
              <span class="fmi-icon">⏱️</span>
              <span class="fmi-text">${f.experience} Experience</span>
            </div>
            ${f.achievements ? `
            <div class="faculty-meta-item">
              <span class="fmi-icon">🏆</span>
              <span class="fmi-text">${f.achievements}</span>
            </div>` : ""}
          </div>

          <!-- Contact Buttons -->
          <div class="faculty-contact">
            ${f.email ? `
            <a href="mailto:${f.email}" class="faculty-contact-btn"
               title="Email: ${f.email}">✉️</a>` : ""}
            ${f.phone ? `
            <a href="tel:${f.phone}" class="faculty-contact-btn"
               title="Phone: ${f.phone}">📞</a>` : ""}
          </div>

        </div>
      </div>`;
  }

  /* ----------------------------------------------------------
     ADMIN DASHBOARD RENDERS
     ---------------------------------------------------------- */
  function renderDashStats() {
    const el = document.getElementById("dash-stats-grid");
    if (!el) return;
    const stats = [
      { icon: "📝", num: DB.getAdmissions().length, lbl: "Applications" },
      { icon: "✉️", num: DB.getMessages().length,   lbl: "Messages"     },
      { icon: "📋", num: DB.getNotices().length,    lbl: "Notices"      },
      { icon: "🖼️", num: DB.getGallery().length,    lbl: "Gallery"      },
      { icon: "👨‍🏫", num: DB.getFaculty().length,   lbl: "Faculty"      }
    ];
    el.innerHTML = stats.map(s =>
      `<div class="ds-card">
         <div class="ds-icon">${s.icon}</div>
         <div class="ds-num">${s.num}</div>
         <div class="ds-lbl">${s.lbl}</div>
       </div>`
    ).join("");
  }

  function renderRecentAdmissions() {
    const el = document.getElementById("recent-admissions");
    if (!el) return;
    const statColors = {
      Approved:      "badge-green",
      Pending:       "badge-gold",
      "Under Review":"badge-blue"
    };
    el.innerHTML = DB.getAdmissions().slice(0, 5).map(a =>
      `<tr>
         <td><strong>${a.studentName}</strong></td>
         <td>${a.className}</td>
         <td>${a.fatherName}</td>
         <td>${a.phone}</td>
         <td style="font-size:.82rem">${a.date}</td>
         <td>
           <span class="badge ${statColors[a.status] || "badge-blue"}">
             ${a.status}
           </span>
         </td>
       </tr>`
    ).join("");
  }

  function renderAllAdmissions() {
    const el = document.getElementById("all-admissions");
    if (!el) return;
    el.innerHTML = DB.getAdmissions().map(a =>
      `<tr>
         <td style="font-weight:700;color:var(--primary)">#${a.id}</td>
         <td><strong>${a.studentName}</strong></td>
         <td>${a.fatherName}</td>
         <td>${a.className}</td>
         <td>${a.phone}</td>
         <td style="font-size:.83rem">${a.email}</td>
         <td style="font-size:.82rem">${a.date}</td>
       </tr>`
    ).join("");
  }

  function renderAllMessages() {
    const el = document.getElementById("all-messages");
    if (!el) return;
    el.innerHTML = DB.getMessages().map(m =>
      `<tr>
         <td style="font-weight:700;color:var(--primary)">#${m.id}</td>
         <td><strong>${m.name}</strong></td>
         <td style="font-size:.83rem">${m.email}</td>
         <td>
           <span class="badge badge-blue" style="font-size:.75rem">
             ${m.subject}
           </span>
         </td>
         <td style="font-size:.85rem;max-width:200px">
           ${m.message.substring(0,60)}${m.message.length > 60 ? "..." : ""}
         </td>
         <td style="font-size:.82rem">${m.date}</td>
       </tr>`
    ).join("");
  }

  function renderAdminNotices() {
    const el = document.getElementById("admin-notices-table");
    if (!el) return;
    const catColors = {
      Event:"badge-gold", Exam:"badge-red", Holiday:"badge-green",
      Admission:"badge-blue", Fee:"badge-red", General:"badge-blue"
    };
    el.innerHTML = DB.getNotices().map(n =>
      `<tr>
         <td><strong>${n.title}</strong></td>
         <td>
           <span class="badge ${catColors[n.category] || "badge-blue"}">
             ${n.category}
           </span>
         </td>
         <td style="font-size:.83rem">${n.date}</td>
         <td>
           <button class="btn btn-danger btn-sm"
             onclick="adminDeleteNotice(${n.id})">🗑️ Delete</button>
         </td>
       </tr>`
    ).join("");
  }

  function renderAdminGallery() {
    const el = document.getElementById("admin-gallery-table");
    if (!el) return;
    el.innerHTML = DB.getGallery().map(g => {
      const preview = g.image
        ? `<img src="${g.image}"
                style="width:40px;height:40px;border-radius:4px;object-fit:cover">`
        : `<span style="font-size:1.8rem">${g.emoji}</span>`;
      return `<tr>
        <td>${preview}</td>
        <td>${g.caption}</td>
        <td><span class="badge badge-blue">${g.category}</span></td>
        <td style="font-size:.83rem">${g.date}</td>
        <td>
          <button class="btn btn-danger btn-sm"
            onclick="adminDeleteGallery(${g.id})">🗑️ Delete</button>
        </td>
      </tr>`;
    }).join("");
  }

  /* ✅ ADMIN FACULTY TABLE */
  function renderAdminFaculty() {
    const el = document.getElementById("admin-faculty-table");
    if (!el) return;

    const typeColors = {
      management: "badge-blue",
      primary:    "badge-green",
      preprimary: "badge-gold",
      sports:     "badge-green",
      arts:       "badge-blue",
      support:    "badge-gold"
    };

    if (DB.getFaculty().length === 0) {
      el.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;padding:32px;color:var(--gray-400)">
            No faculty added yet. Use the form above to add faculty members.
          </td>
        </tr>`;
      return;
    }

    el.innerHTML = DB.getFaculty().map(f => `
      <tr>
        <td>
          <div style="width:44px;height:44px;border-radius:50%;
                      background:${f.bg};display:flex;align-items:center;
                      justify-content:center;font-size:1.5rem;overflow:hidden;
                      border:2px solid var(--gray-200)">
            ${f.image
              ? `<img src="${f.image}"
                      style="width:100%;height:100%;object-fit:cover">`
              : f.emoji}
          </div>
        </td>
        <td>
          <strong style="color:var(--gray-900)">${f.name}</strong><br>
          <span style="font-size:.78rem;color:var(--gray-400)">${f.email || ""}</span>
        </td>
        <td>${f.designation}</td>
        <td>${f.subject}</td>
        <td>
          <span class="badge ${typeColors[f.type] || "badge-blue"}">
            ${f.type}
          </span>
        </td>
        <td style="font-size:.85rem;color:var(--gray-600)">${f.experience}</td>
        <td>
          <button class="btn btn-danger btn-sm"
            onclick="adminDeleteFaculty(${f.id})">🗑️</button>
        </td>
      </tr>`
    ).join("");
  }

  /* Public API */
  return {
    renderTicker, renderClasses, renderSubjects,
    renderCalendar, renderFeeTable,
    renderGallery, renderNotices, renderUpcomingEvents,
    renderFaculty, renderAdminFaculty,
    renderDashStats, renderRecentAdmissions,
    renderAllAdmissions, renderAllMessages,
    renderAdminNotices, renderAdminGallery
  };

})();