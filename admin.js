/* =============================================================
   admin.js — Admin Panel Logic — COMPLETE
   ============================================================= */

const Admin = (() => {

  let isLoggedIn         = false;
  let noticeFilePicked   = null;
  let galleryImageBase64 = null;
  let facultyImageBase64 = null;

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  function init() {
    const overlay   = document.getElementById("admin-overlay");
    const loginCard = document.getElementById("login-card");
    const dashboard = document.getElementById("admin-dashboard");

    /* Open overlay */
    ["open-admin-btn", "open-admin-btn-mobile"].forEach(id => {
      document.getElementById(id)?.addEventListener("click", e => {
        e.preventDefault();
        overlay.classList.add("active");
        if (isLoggedIn) {
          loginCard.style.display  = "none";
          dashboard.style.display  = "block";
          _refreshDashboard();
        } else {
          loginCard.style.display  = "block";
          dashboard.style.display  = "none";
        }
      });
    });

    /* Close overlay */
    document.getElementById("admin-cancel-btn")
      ?.addEventListener("click",
        () => overlay.classList.remove("active"));
    document.getElementById("admin-dashboard-close")
      ?.addEventListener("click",
        () => overlay.classList.remove("active"));
    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.classList.remove("active");
    });

    /* Login / Logout */
    document.getElementById("admin-login-btn")
      ?.addEventListener("click", _handleLogin);
    document.getElementById("admin-password")
      ?.addEventListener("keydown",
        e => { if (e.key === "Enter") _handleLogin(); });
    document.getElementById("admin-logout-btn")
      ?.addEventListener("click", _handleLogout);

    /* Tab switching */
    document.querySelectorAll(".dash-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".dash-tab")
                .forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".dash-panel")
                .forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        const panel = document.getElementById("panel-" + tab.dataset.tab);
        if (panel) panel.classList.add("active");
      });
    });

    /* Notice drag & drop */
    _initDragDrop("notice-upload-area", "application/pdf", file => {
      _displayNoticeFile(file);
    });

    /* Gallery drag & drop */
    _initDragDrop("gallery-upload-area", "image/", file => {
      _readImageFile(file, "gallery");
    });

    /* Faculty drag & drop */
    _initDragDrop("faculty-upload-area", "image/", file => {
      _readImageFile(file, "faculty");
    });
  }

  /* Reusable drag & drop setup */
  function _initDragDrop(areaId, acceptType, callback) {
    const area = document.getElementById(areaId);
    if (!area) return;
    area.addEventListener("dragover", e => {
      e.preventDefault();
      area.classList.add("drag-over");
    });
    area.addEventListener("dragleave", () => {
      area.classList.remove("drag-over");
    });
    area.addEventListener("drop", e => {
      e.preventDefault();
      area.classList.remove("drag-over");
      const file = e.dataTransfer.files[0];
      if (file && file.type.includes(acceptType.replace("/",""))) {
        callback(file);
      } else {
        Utils.showToast("Invalid file type dropped.", "error");
      }
    });
  }

  /* ----------------------------------------------------------
     LOGIN
     ---------------------------------------------------------- */
  function _handleLogin() {
    const userEl  = document.getElementById("admin-username");
    const passEl  = document.getElementById("admin-password");
    const errEl   = document.getElementById("admin-login-err");
    const userErr = document.getElementById("admin-user-err");
    const passErr = document.getElementById("admin-pass-err");
    const user    = userEl.value.trim();
    const pass    = passEl.value;

    /* Clear previous errors */
    [userEl, passEl].forEach(el => el.classList.remove("error"));
    userErr.classList.remove("show");
    passErr.classList.remove("show");
    errEl.style.display = "none";

    let valid = true;
    if (!user) {
      userErr.classList.add("show");
      userEl.classList.add("error");
      valid = false;
    }
    if (!pass) {
      passErr.classList.add("show");
      passEl.classList.add("error");
      valid = false;
    }
    if (!valid) return;

    if (DB.login(user, pass)) {
      isLoggedIn = true;
      document.getElementById("login-card").style.display      = "none";
      document.getElementById("admin-dashboard").style.display = "block";
      _refreshDashboard();
      Utils.showToast("Welcome back, Admin! 👋", "success");
    } else {
      errEl.style.display = "block";
      userEl.classList.add("error");
      passEl.classList.add("error");
      Utils.showToast("Invalid username or password.", "error");
    }
  }

  /* ----------------------------------------------------------
     LOGOUT
     ---------------------------------------------------------- */
  function _handleLogout() {
    isLoggedIn = false;
    document.getElementById("login-card").style.display      = "block";
    document.getElementById("admin-dashboard").style.display = "none";
    document.getElementById("admin-username").value = "";
    document.getElementById("admin-password").value = "";
    document.getElementById("admin-username").classList.remove("error");
    document.getElementById("admin-password").classList.remove("error");
    /* Reset to Overview tab */
    document.querySelectorAll(".dash-tab")
            .forEach((t, i) => t.classList.toggle("active", i === 0));
    document.querySelectorAll(".dash-panel")
            .forEach((p, i) => p.classList.toggle("active", i === 0));
    Utils.showToast("Logged out successfully.", "info");
  }

  /* ----------------------------------------------------------
     REFRESH DASHBOARD — renders all panels
     ---------------------------------------------------------- */
  function _refreshDashboard() {
    UI.renderDashStats();
    UI.renderRecentAdmissions();
    UI.renderAllAdmissions();
    UI.renderAllMessages();
    UI.renderAdminNotices();
    UI.renderAdminGallery();
    UI.renderAdminFaculty();      // ← FACULTY TABLE
    _renderOverviewExtras();
    _updateSettingsPanel();
  }

  /* Overview admission status + faculty summary */
  function _renderOverviewExtras() {
    /* Admission status summary */
    const el1 = document.getElementById("admission-status-summary");
    if (el1) {
      const stats = DB.getDashboardStats();
      el1.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;justify-content:space-between;
                      align-items:center">
            <span style="font-size:.88rem;color:var(--gray-600)">
              Total Applications
            </span>
            <span class="badge badge-blue">${stats.totalAdmissions}</span>
          </div>
          <div style="display:flex;justify-content:space-between;
                      align-items:center">
            <span style="font-size:.88rem;color:var(--gray-600)">
              ⏳ Pending
            </span>
            <span class="badge badge-gold">${stats.pendingAdmissions}</span>
          </div>
          <div style="display:flex;justify-content:space-between;
                      align-items:center">
            <span style="font-size:.88rem;color:var(--gray-600)">
              ✅ Approved
            </span>
            <span class="badge badge-green">${stats.approvedAdmissions}</span>
          </div>
        </div>`;
    }

    /* Faculty type summary */
    const el2 = document.getElementById("faculty-summary");
    if (el2) {
      const fs = DB.getFacultyStats();
      const rows = [
        ["👔 Management", fs.management],
        ["📚 Teachers",   fs.primary],
        ["🧸 Pre-Primary",fs.preprimary],
        ["⚽ Sports",     fs.sports],
        ["🎨 Arts",       fs.arts],
        ["🛠️ Support",    fs.support],
      ];
      el2.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:7px">
          ${rows.map(([label, count]) => `
            <div style="display:flex;justify-content:space-between;
                        align-items:center">
              <span style="font-size:.85rem;color:var(--gray-600)">
                ${label}
              </span>
              <span class="badge badge-blue">${count}</span>
            </div>`).join("")}
        </div>`;
    }
  }

  function _updateSettingsPanel() {
    const el = document.getElementById("settings-username-display");
    if (el) el.textContent = DB.getAdminUsername();

    const el2 = document.getElementById("settings-total-records");
    if (el2) {
      const s = DB.getDashboardStats();
      el2.textContent =
        `${s.totalAdmissions} admissions · ` +
        `${s.totalFaculty} faculty · ` +
        `${s.totalGallery} photos`;
    }
  }

  /* ----------------------------------------------------------
     NOTICE UPLOAD
     ---------------------------------------------------------- */
  function _displayNoticeFile(file) {
    noticeFilePicked = file;
    const el = document.getElementById("notice-file-name");
    if (el) {
      el.innerHTML = `
        <span style="color:var(--success);font-weight:700">
          ✅ ${file.name}
          (${(file.size / 1024).toFixed(1)} KB)
        </span>`;
    }
  }

  function handleNoticeFile(e) {
    const file = e.target.files[0];
    if (file) _displayNoticeFile(file);
  }

  function uploadNotice() {
    const title    = document.getElementById("notice-title")?.value.trim();
    const desc     = document.getElementById("notice-desc")?.value.trim();
    const category = document.getElementById("notice-category")?.value;

    if (!title) {
      Utils.showToast("Please enter a notice title.", "error");
      document.getElementById("notice-title").classList.add("error");
      return;
    }

    const res = DB.addNotice({
      title,
      desc:   desc || title,
      category,
      hasPdf: !!noticeFilePicked
    });

    if (res.success) {
      Utils.showToast("📋 Notice published!", "success");
      document.getElementById("notice-title").value = "";
      document.getElementById("notice-desc").value  = "";
      document.getElementById("notice-title").classList.remove("error");
      const fn = document.getElementById("notice-file-name");
      if (fn) fn.innerHTML = "";
      noticeFilePicked = null;
      _refreshDashboard();
      UI.renderNotices();
      UI.renderTicker();
    }
  }

  /* ----------------------------------------------------------
     IMAGE FILE READER (shared for gallery + faculty)
     ---------------------------------------------------------- */
  function _readImageFile(file, target) {
    const reader = new FileReader();
    reader.onload = event => {
      if (target === "gallery") {
        galleryImageBase64 = event.target.result;
        const el = document.getElementById("gallery-image-preview");
        if (el) el.innerHTML = `
          <div style="margin-top:12px">
            <img src="${galleryImageBase64}"
                 style="max-height:120px;border-radius:8px;
                        border:2px solid var(--primary-light)">
            <p style="font-size:.8rem;color:var(--success);
                      margin-top:6px;font-weight:600">
              ✅ ${file.name} ready
            </p>
          </div>`;
        Utils.showToast("Photo selected! Add caption then click Add.", "info");
      } else if (target === "faculty") {
        facultyImageBase64 = event.target.result;
        const el = document.getElementById("faculty-image-preview");
        if (el) el.innerHTML = `
          <div style="display:flex;flex-direction:column;
                      align-items:center;gap:8px;margin-top:12px">
            <img src="${facultyImageBase64}"
                 style="width:90px;height:90px;border-radius:50%;
                        object-fit:cover;
                        border:3px solid var(--primary-light);
                        box-shadow:0 4px 14px rgba(30,64,175,.25)">
            <p style="font-size:.8rem;color:var(--success);font-weight:700">
              ✅ ${file.name}
            </p>
          </div>`;
        Utils.showToast("Photo selected! Fill in details then Add Member.", "info");
      }
    };
    reader.readAsDataURL(file);
  }

  /* ----------------------------------------------------------
     GALLERY UPLOAD
     ---------------------------------------------------------- */
  function handleGalleryImageSelect(e) {
    const file = e.target.files[0];
    if (file) _readImageFile(file, "gallery");
  }

  function uploadGalleryItem() {
    const caption  = document.getElementById("gallery-caption-input")?.value.trim();
    const category = document.getElementById("gallery-cat-input")?.value;
    const emoji    = document.getElementById("gallery-emoji-input")?.value.trim() || "🖼️";
    const catBg    = {
      events:"#1e3a8a", sports:"#065f46",
      academics:"#7c3aed", cultural:"#b45309"
    };

    if (!caption) {
      Utils.showToast("Please enter a caption for the photo.", "error");
      document.getElementById("gallery-caption-input").classList.add("error");
      return;
    }

    const res = DB.addGalleryItem({
      caption, category, emoji,
      imageData: galleryImageBase64,
      bg: catBg[category] || "#1e3a8a"
    });

    if (res.success) {
      Utils.showToast("🖼️ Photo added to gallery!", "success");
      document.getElementById("gallery-caption-input").value = "";
      document.getElementById("gallery-caption-input").classList.remove("error");
      document.getElementById("gallery-emoji-input").value  = "🖼️";
      document.getElementById("gallery-image-preview").innerHTML = "";
      const fi = document.getElementById("gallery-image-upload");
      if (fi) fi.value = "";
      galleryImageBase64 = null;
      _refreshDashboard();
      UI.renderGallery("all");
      /* Reset filter */
      document.querySelectorAll(".filter-btn")
              .forEach(b => b.classList.remove("active"));
      document.querySelector('.filter-btn[data-cat="all"]')
              ?.classList.add("active");
    }
  }

  /* ----------------------------------------------------------
     ✅ FACULTY UPLOAD — COMPLETE & WORKING
     ---------------------------------------------------------- */
  function handleFacultyImageSelect(e) {
    const file = e.target.files[0];
    if (file) _readImageFile(file, "faculty");
  }

  function uploadFaculty() {
    /* Collect values */
    const name        = document.getElementById("faculty-name-input")?.value.trim();
    const designation = document.getElementById("faculty-designation-input")?.value.trim();
    const subject     = document.getElementById("faculty-subject-input")?.value.trim();
    const qual        = document.getElementById("faculty-qual-input")?.value.trim();
    const exp         = document.getElementById("faculty-exp-input")?.value.trim();
    const type        = document.getElementById("faculty-type-input")?.value;
    const emoji       = document.getElementById("faculty-emoji-input")?.value.trim() || "👨‍🏫";
    const email       = document.getElementById("faculty-email-input")?.value.trim();
    const phone       = document.getElementById("faculty-phone-input")?.value.trim();
    const achieve     = document.getElementById("faculty-achieve-input")?.value.trim();

    /* Validation */
    let valid = true;
    [
      ["faculty-name-input",        "faculty-name-err",        name],
      ["faculty-designation-input", "faculty-designation-err", designation],
      ["faculty-subject-input",     "faculty-subject-err",     subject],
    ].forEach(([inputId, errId, val]) => {
      const inp = document.getElementById(inputId);
      const err = document.getElementById(errId);
      if (!val) {
        inp?.classList.add("error");
        err?.classList.add("show");
        valid = false;
      } else {
        inp?.classList.remove("error");
        err?.classList.remove("show");
      }
    });

    if (!valid) {
      Utils.showToast("Please fill in all required fields.", "error");
      return;
    }

    /* Background color by type */
    const bgColors = {
      management:"#1e3a8a", primary:"#0e7490",
      preprimary:"#c2410c", sports:"#15803d",
      arts:"#6d28d9",       support:"#92400e"
    };

    /* Save to DB */
    const res = DB.addFaculty({
      name, designation, subject,
      qualification: qual    || "N/A",
      experience:    exp     || "N/A",
      type,
      emoji,
      imageData:     facultyImageBase64,   // base64 or null
      bg:            bgColors[type] || "#1e3a8a",
      email:         email   || "",
      phone:         phone   || "",
      achievements:  achieve || ""
    });

    if (res.success) {
      Utils.showToast(`👨‍🏫 ${name} added successfully!`, "success", 4000);

      /* Reset form */
      const resetIds = [
        "faculty-name-input","faculty-designation-input",
        "faculty-subject-input","faculty-qual-input",
        "faculty-exp-input","faculty-email-input",
        "faculty-phone-input","faculty-achieve-input"
      ];
      resetIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = ""; el.classList.remove("error"); }
      });
      document.getElementById("faculty-emoji-input").value = "👨‍🏫";
      document.getElementById("faculty-image-preview").innerHTML = "";
      const fi = document.getElementById("faculty-photo-upload");
      if (fi) fi.value = "";
      facultyImageBase64 = null;

      /* Re-render */
      _refreshDashboard();
      UI.renderFaculty("all");

      /* Reset faculty filter to All */
      document.querySelectorAll(".faculty-filter-btn")
              .forEach(b => b.classList.remove("active"));
      document.querySelector('.faculty-filter-btn[data-type="all"]')
              ?.classList.add("active");
    }
  }

  /* ----------------------------------------------------------
     DELETE ACTIONS
     ---------------------------------------------------------- */
  function deleteNotice(id) {
    if (!confirm("Delete this notice permanently?")) return;
    DB.deleteNotice(id);
    _refreshDashboard();
    UI.renderNotices();
    Utils.showToast("Notice deleted.", "info");
  }

  function deleteGallery(id) {
    if (!confirm("Delete this photo permanently?")) return;
    DB.deleteGalleryItem(id);
    _refreshDashboard();
    UI.renderGallery("all");
    Utils.showToast("Photo removed.", "info");
  }

  function deleteFaculty(id) {
    const member = DB.getFacultyById(id);
    const name   = member ? member.name : "this member";
    if (!confirm(`Remove ${name} from faculty?`)) return;
    DB.deleteFaculty(id);
    _refreshDashboard();
    UI.renderFaculty("all");
    Utils.showToast(`${name} removed.`, "info");
  }

  /* ----------------------------------------------------------
     ADMISSION FILTER
     ---------------------------------------------------------- */
  function filterAdmissions(status) {
    const el = document.getElementById("all-admissions");
    if (!el) return;
    const data = DB.filterAdmissionsByStatus(status);
    const statColors = {
      Approved:"badge-green", Pending:"badge-gold",
      "Under Review":"badge-blue"
    };
    el.innerHTML = data.map(a => `
      <tr>
        <td style="font-weight:700;color:var(--primary)">#${a.id}</td>
        <td><strong>${a.studentName}</strong></td>
        <td>${a.fatherName}</td>
        <td>${a.className}</td>
        <td>${a.phone}</td>
        <td style="font-size:.83rem">${a.email}</td>
        <td style="font-size:.82rem">${a.date}</td>
        <td>
          <span class="badge ${statColors[a.status] || "badge-blue"}">
            ${a.status}
          </span>
        </td>
      </tr>`
    ).join("") || `
      <tr>
        <td colspan="8" style="text-align:center;padding:24px;
                               color:var(--gray-400)">
          No applications with status "${status}"
        </td>
      </tr>`;
  }

  /* ----------------------------------------------------------
     FACULTY SEARCH & FILTER (inside admin table)
     ---------------------------------------------------------- */
  function searchFaculty(query) {
    const results = query
      ? DB.searchFaculty(query)
      : DB.getFaculty();
    UI.renderAdminFacultyData(results);
    const badge = document.getElementById("faculty-count-badge");
    if (badge) badge.textContent = `${results.length} members`;
  }

  function filterFacultyByType(type) {
    const results = DB.filterFacultyByType(type);
    UI.renderAdminFacultyData(results);
    const badge = document.getElementById("faculty-count-badge");
    if (badge) badge.textContent = `${results.length} members`;
  }

  /* ----------------------------------------------------------
     CHANGE PASSWORD
     ---------------------------------------------------------- */
  function changePassword() {
    const currentPass = document.getElementById("current-pass")?.value;
    const newUsername = document.getElementById("new-username")?.value.trim();
    const newPass     = document.getElementById("new-pass")?.value;
    const confirmPass = document.getElementById("confirm-pass")?.value;

    if (!currentPass || !newPass || !confirmPass) {
      Utils.showToast("Please fill in all password fields.", "error");
      return;
    }
    if (newPass !== confirmPass) {
      Utils.showToast("New passwords do not match.", "error");
      document.getElementById("new-pass").classList.add("error");
      document.getElementById("confirm-pass").classList.add("error");
      return;
    }
    if (newPass.length < 6) {
      Utils.showToast("Password must be at least 6 characters.", "error");
      return;
    }

    const res = DB.changePassword(currentPass, newUsername, newPass);
    if (res.success) {
      Utils.showToast("🔐 " + res.message, "success");
      document.getElementById("current-pass").value  = "";
      document.getElementById("new-username").value  = "";
      document.getElementById("new-pass").value      = "";
      document.getElementById("confirm-pass").value  = "";
      ["new-pass","confirm-pass"].forEach(id =>
        document.getElementById(id).classList.remove("error")
      );
      _updateSettingsPanel();
    } else {
      Utils.showToast("❌ " + res.message, "error");
      document.getElementById("current-pass").classList.add("error");
    }
  }

  /* Public API */
  return {
    init,
    uploadNotice,
    uploadGalleryItem,
    uploadFaculty,
    deleteNotice,
    deleteGallery,
    deleteFaculty,
    filterAdmissions,
    searchFaculty,
    filterFacultyByType,
    changePassword,
    handleNoticeFile,
    handleGalleryImageSelect,
    handleFacultyImageSelect
  };

})();

/* =============================================================
   GLOBAL HOOKS — for inline onclick="" in HTML
   ============================================================= */
function uploadNotice()              { Admin.uploadNotice();                  }
function uploadGalleryItem()         { Admin.uploadGalleryItem();             }
function uploadFaculty()             { Admin.uploadFaculty();                 }
function adminDeleteNotice(id)       { Admin.deleteNotice(id);                }
function adminDeleteGallery(id)      { Admin.deleteGallery(id);               }
function adminDeleteFaculty(id)      { Admin.deleteFaculty(id);               }
function adminFilterAdmissions(s)    { Admin.filterAdmissions(s);             }
function adminSearchFaculty(q)       { Admin.searchFaculty(q);                }
function adminFilterFaculty(t)       { Admin.filterFacultyByType(t);          }
function changeAdminPassword()       { Admin.changePassword();                 }
function handleNoticeFile(e)         { Admin.handleNoticeFile(e);             }
function handleGalleryImageSelect(e) { Admin.handleGalleryImageSelect(e);     }
function handleFacultyImageSelect(e) { Admin.handleFacultyImageSelect(e);     }