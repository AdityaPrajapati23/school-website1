/* =============================================================
   forms.js — FORM HANDLERS & VALIDATION
   ✏️  Edit validation rules or field logic here.
   ============================================================= */
const Forms = (() => {

  /* ---- ADMISSION FORM ---- */
  function initAdmissionForm() {
    const form = document.getElementById('admission-form');
    if (!form) return;
    const V = Utils.validateField;
    const { isEmail, isPhone, minLen, notEmpty } = Utils;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = [
        V('ad-name',    'ad-name-err',    minLen(3)),
        V('ad-father',  'ad-father-err',  minLen(3)),
        V('ad-dob',     'ad-dob-err',     notEmpty),
        V('ad-class',   'ad-class-err',   notEmpty),
        V('ad-phone',   'ad-phone-err',   isPhone),
        V('ad-email',   'ad-email-err',   isEmail),
        V('ad-address', 'ad-address-err', minLen(10)),
      ].every(Boolean);

      if (!ok) { Utils.showToast('Please fix the highlighted errors.', 'error'); return; }

      const res = DB.addAdmission({
        studentName: document.getElementById('ad-name').value.trim(),
        fatherName:  document.getElementById('ad-father').value.trim(),
        dob:         document.getElementById('ad-dob').value,
        className:   document.getElementById('ad-class').value,
        phone:       document.getElementById('ad-phone').value.trim(),
        email:       document.getElementById('ad-email').value.trim(),
        prevSchool:  document.getElementById('ad-prev').value.trim(),
        address:     document.getElementById('ad-address').value.trim(),
        message:     document.getElementById('ad-msg').value.trim(),
      });

      if (res.success) {
        Utils.showToast(`🎉 ${res.message} Application ID: #${res.id}`, 'success', 5000);
        form.reset();
      }
    });
  }

  /* ---- CONTACT FORM ---- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const V = Utils.validateField;
    const { isEmail, minLen, notEmpty } = Utils;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = [
        V('ct-name',    'ct-name-err',    minLen(2)),
        V('ct-email',   'ct-email-err',   isEmail),
        V('ct-subject', 'ct-subject-err', notEmpty),
        V('ct-message', 'ct-message-err', minLen(10)),
      ].every(Boolean);

      if (!ok) { Utils.showToast('Please fix the highlighted fields.', 'error'); return; }

      const res = DB.addMessage({
        name:    document.getElementById('ct-name').value.trim(),
        email:   document.getElementById('ct-email').value.trim(),
        phone:   document.getElementById('ct-phone').value.trim(),
        subject: document.getElementById('ct-subject').value,
        message: document.getElementById('ct-message').value.trim(),
      });

      if (res.success) {
        Utils.showToast('✅ Message sent! We will reply within 24 hours.', 'success', 5000);
        form.reset();
      }
    });
  }

  return { initAdmissionForm, initContactForm };
})();