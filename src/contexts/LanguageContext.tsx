import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.firm': 'The Firm',
    'nav.expertise': 'Expertise',
    'nav.realEstate': 'Real Estate',
    'nav.taxation': 'International Taxation',
    'nav.estate': 'Estate Planning',
    'nav.insights': 'Insights',
    'nav.globalClients': 'Global Clients',
    'nav.contact': 'Contact',
    'nav.schedule': 'Schedule Consultation',

    // Hero
    'hero.tagline': 'The Future Favors the Prepared',
    'hero.title': 'Attorney & Notary in Tel Aviv',
    'hero.subtitle1': 'Cross-Border Legal Matters for International Clients in Israel',
    'hero.subtitle2': 'Real estate, taxation, and estate planning — delivered with clarity, structure, and financial foresight.',
    'hero.cta': 'Schedule a Consultation',

    // Conflict Section
    'conflict.title': 'Clarity Where Details Decide Outcomes',
    'conflict.body': 'In Israel, major decisions often depend on registration, tax exposure, and compliance — not only on the contract itself. For international clients, the risk increases when legal steps must align with foreign reporting, banking requirements, and cross-border family structures.',
    'conflict.body2': 'We begin with verification and documentation — so decisions are made with facts, not assumptions. Our role is to turn complex requirements into clear, structured decisions that protect your assets.',

    // Guide Section
    'guide.title': 'About the Firm',
    'guide.bio': 'Maya Ziv Law is built around a hybrid advantage: legal strategy informed by financial discipline. The practice serves clients in Israel and abroad with bilingual counsel and a structured, documentation-driven approach designed to support long-term security.',
    'guide.punchline': 'We treat every legal step as a financial decision with long-term consequences.',
    'guide.cta': 'More About the Firm',

    // Methodology
    'method.title': 'A Structured Process — From Verification to Execution',
    'method.subtitle': 'Clients receive a defined process, clear timelines, and rigorous due diligence — with confidentiality and precision at every stage.',
    'method.step1.title': 'Verified Ownership & Status',
    'method.step1.desc': 'Title, encumbrances, planning, and zoning review before commitment.',
    'method.step2.title': 'Tax & Long-Term Structuring',
    'method.step2.desc': 'Early planning to reduce exposure and support compliance.',
    'method.step3.title': 'Remote Execution & Coordination',
    'method.step3.desc': 'Matters can be managed from abroad, including structured documentation and cross-border coordination when required.',

    // Practice Areas
    'practice.title': 'Areas of Practice',
    'practice.realEstate.title': 'Real Estate & Investment',
    'practice.realEstate.desc': 'Secure acquisition and tax planning.',
    'practice.taxation.title': 'International Tax & Compliance',
    'practice.taxation.desc': 'Cross-border reporting and banking regulation.',
    'practice.estate.title': 'Family & Legacy Planning',
    'practice.estate.desc': 'Wills, inheritance, and intergenerational transfer.',
    'practice.learnMore': 'Learn More',
    'practice.additional.olim': 'Olim & Returning Residents',
    'practice.additional.commercial': 'Commercial & Civil',

    // Insights
    'insights.title': 'Insights',
    'insights.readMore': 'Continue Reading',
    'insights.viewAll': 'View All Insights',
    'insights.article1.title': 'Buying Property in Israel as a Foreign Resident',
    'insights.article1.snippet': 'Legal, tax, and registration essentials — with due diligence that supports compliant ownership.',
    'insights.article2.title': 'Wills and Inheritance in Israel for Cross-Border Families',
    'insights.article2.snippet': 'Coordination between jurisdictions to ensure enforceability and reduce conflict and delays.',
    'insights.article3.title': 'Legal Due Diligence Before Buying Property in Israel',
    'insights.article3.snippet': 'Title, planning status, and contractual protections that reduce exposure before signing.',

    // CTA
    'cta.title': 'Your Interests Deserve Personal Attention',
    'cta.subtitle': 'Each inquiry is handled with confidentiality, structured guidance, and precise legal strategy — whether you are based in Israel or abroad.',
    'cta.button': 'Send a Confidential Inquiry',

    // Footer
    'footer.brand': 'Attorney & Notary in Tel Aviv',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.disclaimer': 'Disclaimer',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.disclaimerText': 'This website is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by use of this site.',
    'footer.copyright': '© 2024 Maya Ziv Law. All rights reserved.',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Begin your journey to legal clarity',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.inquiry': 'Nature of Inquiry',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Thank you for your message. We will respond within 24-48 hours.',
    'contact.inquiry.realEstate': 'Real Estate Transaction',
    'contact.inquiry.taxation': 'International Taxation',
    'contact.inquiry.estate': 'Estate Planning',
    'contact.inquiry.other': 'Other Legal Matter',

    // About Page
    'about.hero.title': 'Legal Counsel Built Through a Financial Lens',
    'about.hero.subtitle': 'A boutique practice bridging the gap between legal strategy and financial discipline for international clients in Israel.',
    'about.philosophy.title': 'A Different Approach to Legal Practice',
    'about.philosophy.body': 'Maya Ziv Law was founded on a simple realization: for international investors and families, a legal contract is never just a document—it is a financial instrument. Operating in Israel requires more than just legal knowledge; it demands the ability to synchronize local bureaucracy with global standards.',
    'about.philosophy.body2': 'We provide structured guidance that translates complexity into decisions. We turn regulatory requirements—from registry status and tax exposure to banking documentation—into a clear, actionable plan. The firm integrates analytical discipline with legal strategy, ensuring that clients receive the same standard of professional rigor they expect globally.',
    'about.attorney.title': 'Maya Ziv, Attorney & Notary',
    'about.attorney.body': 'Maya Ziv brings a unique hybrid perspective to the legal field. With international training and professional experience in finance and accounting, she approaches every case with financial rigor and a strategic view of the outcome.',
    'about.attorney.body2': 'We prioritize prevention and structure. Our work is designed to reduce friction, protect positions early, and prevent disputes before they arise. By anticipating regulatory hurdles and structuring transactions correctly from the outset, the goal is to create stability—ensuring that your legal arrangements serve your financial and personal legacy for the long term.',
    'about.serve.title': 'Who We Serve',
    'about.serve.body': 'Our practice is best suited for clients who value thoroughness over speed. We partner with international investors, returning residents, and families who require a high level of involvement and a "zero-surprise" policy.',
    'about.serve.body2': 'Whether you are managing high-value real estate, complex inheritance matters, or cross-border assets, our approach is designed for those who seek a disciplined, methodical, and secure legal process.',
    'about.expect.title': 'What Clients Can Expect',
    'about.expect.intro': 'Engagement with the firm follows a defined, transparent path. We believe that clarity is the antidote to stress, especially when managing affairs remotely.',
    'about.expect.doc.title': 'Documentation-First Approach',
    'about.expect.doc.desc': 'We begin with verification. Decisions are made based on facts and official records, not assumptions.',
    'about.expect.timeline.title': 'Defined Timelines & Fees',
    'about.expect.timeline.desc': 'You will understand the roadmap, the milestones, and the fee structure from the outset. Clear scope expectations are defined early.',
    'about.expect.comm.title': 'Direct Communication',
    'about.expect.comm.desc': 'Clients receive responsive, personal guidance. We manage the complexity of Hebrew bureaucracy so you can make decisions with confidence.',
    'about.cta.title': 'Start a Conversation',
    'about.cta.body': 'A clear plan is the first step to protecting assets and legacy.',
    'about.cta.button': 'Schedule a Consultation',

    // Service Pages - General
    'service.faq': 'Common Questions',

    // Estate Planning Page
    'estate.hero.title': 'Inheritance & Estate Planning in Israel for International Families',
    'estate.hero.subtitle': 'Legal strategies for cross-border wealth transfer, bilingual wills, and Enduring Power of Attorney (Israel).',
    'estate.challenge.title': 'Managing Family Wealth Across Jurisdictions',
    'estate.challenge.body': 'Families with assets in Israel and ties abroad face a unique legal landscape. Israeli inheritance procedures often interact with foreign laws, creating potential conflicts regarding jurisdiction and tax liability. A standard Israeli will is rarely sufficient for a multi-national estate.',
    'estate.challenge.body2': 'Our role is to coordinate these systems. We develop legal structures designed to harmonize your Israeli assets with your global estate plan, aiming to prevent administrative deadlock and protect your intent.',
    'estate.wills.title': 'Cross-Border Wills & Probate Strategy',
    'estate.wills.body': 'We draft bilingual wills that meet strict Israeli legal standards while referencing your global estate structure. Where appropriate, we structure an Israel-focused will that aligns with an existing foreign will, aiming to reduce friction in Israeli procedures without conflicting with your primary estate plan abroad.',
    'estate.wills.compliance.title': 'Drafting for Compliance',
    'estate.wills.compliance.desc': 'Preparing documents to meet Israeli formal requirements and evidentiary standards.',
    'estate.wills.probate.title': 'Probate Management',
    'estate.wills.probate.desc': 'Representing heirs in obtaining Succession Orders (Yerusha) or Probate Orders (Kiyum Tzava\'a) efficiently.',
    'estate.wills.conflict.title': 'Conflict Reduction',
    'estate.wills.conflict.desc': 'Clear, unambiguous drafting intended to minimize interpretation disputes among beneficiaries.',
    'estate.epa.title': 'Enduring Power of Attorney (Israel)',
    'estate.epa.body': 'An Enduring Power of Attorney (EPA) is a tool for retaining control. It allows you to appoint trusted representatives to manage your personal and financial affairs in Israel, should you be unable to do so in the future.',
    'estate.epa.body2': 'Unlike a court-appointed guardianship, an EPA allows you to define the scope of authority in advance. We prepare comprehensive documents that preserve your autonomy and define clear instructions for asset management.',
    'estate.process.title': 'How We Work: The Planning Process',
    'estate.process.step1.title': 'Discovery & Mapping',
    'estate.process.step1.desc': 'We map your assets, jurisdictions, and family dynamics to understand the full legal picture.',
    'estate.process.step2.title': 'Strategy & Structure',
    'estate.process.step2.desc': 'We propose a structure (documents and coordination steps) aligned with your goals and jurisdictions.',
    'estate.process.step3.title': 'Drafting & Execution',
    'estate.process.step3.desc': 'Documents are drafted bilingually and signed in the appropriate form—in Israel or abroad—to meet evidentiary requirements.',
    'estate.process.step4.title': 'Safe Keeping & Guidance',
    'estate.process.step4.desc': 'We provide instructions for storage and guidance for your executors on future activation.',
    'estate.process.note': 'Clear scope, defined next steps, and documentation requirements are established from the outset.',
    'estate.tax.title': 'Tax Considerations for Cross-Border Estates',
    'estate.tax.body': "Israel's tax regime regarding inheritance and transfers differs from many Western jurisdictions. Transferring assets—whether during your lifetime or after—requires careful timing to avoid unnecessary tax events.",
    'estate.tax.body2': 'We flag potential tax touchpoints in Israel and coordinate with relevant advisors where needed. Our goal is to assess the structure of your estate to reduce avoidable exposure and protect the value of the legacy passing to the next generation.',
    'estate.financial.title': 'Complementary Service: Financial Agreements',
    'estate.financial.body': 'For couples with significant assets, we draft bilingual Prenuptial and Postnuptial Agreements. These agreements provide financial clarity and are validated by the relevant court or notary to strengthen enforceability.',
    'estate.faq.q1': 'Do I need a separate will for my Israeli assets?',
    'estate.faq.a1': 'In many cross-border situations, an Israel-focused will can reduce procedural friction for assets in Israel. While foreign wills can often be validated here, the process is procedurally complex and slower.',
    'estate.faq.q2': 'Can I appoint a foreign resident as my executor?',
    'estate.faq.a2': 'Yes, though it requires specific procedural steps. We guide clients on the practical implications of appointing executors who reside outside Israel.',
    'estate.cta.title': 'Plan for the Future',
    'estate.cta.body': "Secure your family's interests with a structured, legally sound estate plan.",
    'estate.cta.button': 'Request a Confidential Consultation',
    'estate.cta.note': 'Response within 1-2 business days',

    // Real Estate Page
    'realestate.hero.title': 'Real Estate Lawyer in Tel Aviv for Property Purchase in Israel',
    'realestate.hero.subtitle': 'Comprehensive counsel for international buyers: Due diligence, tax strategy, and secure registration.',
    'realestate.approach.title': 'More Than a Transaction—A Strategic Investment',
    'realestate.approach.body': 'For many clients, acquiring property in Israel represents more than a real estate transaction; it is a personal milestone and a significant capital deployment with long-term financial implications.',
    'realestate.approach.body2': 'We provide structured legal guidance designed to secure the asset. From preliminary checks to registration with the Israel Land Registry (Tabu), each stage is handled with clarity, discipline, and foresight to ensure a compliant transfer of ownership.',
    'realestate.risk.title': 'Reducing Exposure in a Complex Market',
    'realestate.risk.intro': 'Israeli real estate law places the burden of verification on the buyer ("Caveat Emptor"). Our due diligence is designed to detect and neutralize risks before you sign:',
    'realestate.risk.liabilities.title': 'Hidden Liabilities',
    'realestate.risk.liabilities.desc': 'Detecting existing liens, debts, or mortgages attached to the title.',
    'realestate.risk.planning.title': 'Planning & Zoning',
    'realestate.risk.planning.desc': 'Verifying that the property is built legally and matches municipal permits to prevent future devaluation or fines.',
    'realestate.risk.tax.title': 'Tax Exposure',
    'realestate.risk.tax.desc': 'Identifying timing issues or residency classifications that could trigger unnecessary tax liabilities.',
    'realestate.tax.title': 'Tax Planning as Part of the Deal',
    'realestate.tax.body': 'Purchase tax in Israel is dynamic. Foreign residents are generally subject to different tax brackets compared to new immigrants (Olim) or returning residents.',
    'realestate.tax.body2': 'We treat tax planning as an integral part of the contract. Drawing on deep familiarity with Israeli tax regulation, we assess your status before the transaction structure is finalized. The firm prepares and submits filings to ensure you benefit from all lawful exemptions and avoid unnecessary exposure.',
    'realestate.diligence.title': 'Rigorous Due Diligence',
    'realestate.diligence.body': 'A secure transaction begins with verification. Before any commitment is made, we conduct a comprehensive legal audit of the property. This includes verifying title ownership, checking for encumbrances, and reviewing the planning status.',
    'realestate.diligence.body2': 'This structured analysis allows you to make an informed decision based on documented facts, ensuring the asset you view is the asset you legally acquire.',
    'realestate.remote.title': 'Managing the Transaction from Abroad',
    'realestate.remote.body': 'Clients residing outside Israel can typically manage the purchase process remotely. Representation is executed through a specific power of attorney signed at an Israeli consulate or before a local notary with an apostille.',
    'realestate.remote.body2': 'This enables us to manage the transaction on your behalf—from negotiation to final registration—allowing you to complete the acquisition securely while remaining overseas.',
    'realestate.faq.q1': 'When should tax planning begin?',
    'realestate.faq.a1': 'Tax liability should be assessed before signing any memorandum or contract. Early structuring allows us to apply for relevant exemptions (such as Olim benefits) and prevent overpayment.',
    'realestate.faq.q2': 'How are funds protected during the transaction?',
    'realestate.faq.a2': "Funds are typically held in escrow (trust) and released according to a strict schedule linked to legal milestones, such as the registration of a \"Warning Note\" (He'arat Azhara) in your favor.",
    'realestate.faq.q3': 'Can I buy property before making Aliyah?',
    'realestate.faq.a3': 'Yes. Non-residents can purchase property. We advise on how the timing of the purchase relative to your Aliyah date affects your purchase tax benefits.',
    'realestate.cta.title': 'Secure Your Investment',
    'realestate.cta.body': 'Start your acquisition with a clear legal and financial strategy.',
    'realestate.cta.button': 'Schedule a Consultation',

    // Taxation Page
    'tax.hero.title': 'Israeli Tax & Banking Compliance Lawyer in Tel Aviv',
    'tax.hero.subtitle': 'Cross-border reporting, real estate tax planning, and AML compliance for international clients.',
    'tax.context.title': 'A Financial Lens on Legal Strategy',
    'tax.context.body': 'Today, tax and compliance shape whether transactions are approved, funded, and completed. Whether purchasing property or transferring funds, every transaction carries implications in Israel and potentially abroad.',
    'tax.context.body2': 'We approach every case with financial discipline. By integrating tax planning into the legal process from day one, we aim to minimize regulatory friction, support full compliance, and support your standing with financial institutions.',
    'tax.realEstate.title': 'Real Estate Tax Planning',
    'tax.realEstate.body': "Tax assessment is the first step of any property transaction. Israel's tax brackets for Purchase Tax (Mas Rechisha) and Capital Gains Tax (Mas Shevach) vary based on residency and status.",
    'tax.realEstate.assessment.title': 'Pre-Contract Assessment',
    'tax.realEstate.assessment.desc': 'Calculating projected liabilities and checking eligibility for relevant exemptions where applicable before you sign.',
    'tax.realEstate.ownership.title': 'Ownership Planning',
    'tax.realEstate.ownership.desc': 'We help you evaluate ownership and registration options early, aligned with your status and long-term goals.',
    'tax.realEstate.filing.title': 'Filing & Reporting',
    'tax.realEstate.filing.desc': 'Managing submissions to the Israel Tax Authority with careful documentation to reduce errors and delays.',
    'tax.banking.title': 'Banking Regulation & Source of Funds',
    'tax.banking.body': 'Transferring capital to Israel has become increasingly complex due to strict Anti-Money Laundering (AML) regulations. Israeli banks require rigorous "Source of Funds" documentation before accepting foreign transfers.',
    'tax.banking.body2': "We guide clients through the bank's compliance review. This typically includes preparing a structured source-of-funds narrative and organizing supporting documents specifically for compliance teams. We coordinate directly with the bank to support a compliant transfer process and facilitate their review.",
    'tax.serve.title': 'Is This Service Right for You?',
    'tax.serve.body': 'This service is designed for clients who prioritize a documented, transparent process. We partner with international investors and residents who understand that compliance is the key to asset safety.',
    'tax.serve.compliance': 'Compliance-First',
    'tax.serve.compliance.desc': 'We do not engage in undocumented transfers or strategies intended to bypass regulation.',
    'tax.serve.firstStep': 'First Step',
    'tax.serve.firstStep.desc': 'Engagement begins with a document checklist and a risk assessment to identify potential red flags early.',
    'tax.crossBorder.title': 'Coordination with International Obligations',
    'tax.crossBorder.body': "Israel's treaty network may affect how certain income and reporting obligations are treated, depending on your jurisdiction.",
    'tax.crossBorder.body2': 'We flag potential treaty-related considerations and coordinate with your foreign tax advisors. While we do not file foreign tax returns, we ensure that your Israeli legal actions are communicated clearly to your global team to maintain a consistent tax position.',
    'tax.olim.title': 'Planning for Olim & Returning Residents',
    'tax.olim.body': 'New immigrants and returning residents may be eligible for certain reliefs, including the 10-year reporting relief in certain cases, subject to eligibility rules. We help structure timing and documentation to support a compliant transition into the Israeli tax system.',
    'tax.faq.q1': 'Can I pay Israeli purchase tax in foreign currency?',
    'tax.faq.a1': 'Taxes are generally paid in Shekels (NIS). We guide clients on timing, conversion logistics, and payment vouchers so funds arrive on time and in the required form.',
    'tax.faq.q2': 'Will the Israeli bank automatically accept my transfer?',
    'tax.faq.a2': 'Compliance is never automatic. Large transfers trigger checks. We prepare the "Source of Funds" file in advance to reduce the risk of funds being frozen or rejected.',
    'tax.faq.q3': 'When do I become a tax resident of Israel?',
    'tax.faq.a3': 'Residency is determined by a "Center of Life" test, not just citizenship. We advise on the legal criteria and how your presence in Israel affects your status.',
    'tax.cta.title': 'Strategic Compliance',
    'tax.cta.body': 'Start with a documented plan that banks and authorities can review.',
    'tax.cta.button': 'Request a Confidential Consultation',
  },
  he: {
    // Navigation
    'nav.firm': 'המשרד',
    'nav.expertise': 'תחומי התמחות',
    'nav.realEstate': 'נדל"ן',
    'nav.taxation': 'מיסוי בינלאומי',
    'nav.estate': 'ירושות וצוואות',
    'nav.insights': 'מאמרים',
    'nav.globalClients': 'לקוחות בינלאומיים',
    'nav.contact': 'צור קשר',
    'nav.schedule': 'תיאום פגישת ייעוץ',

    // Hero
    'hero.tagline': 'העתיד מעדיף את המוכנים',
    'hero.title': 'עורכת דין ונוטריון בתל אביב',
    'hero.subtitle1': 'ענייני משפט חוצי גבולות ללקוחות בינלאומיים בישראל',
    'hero.subtitle2': 'נדל"ן, מיסוי ותכנון עיזבון — עם בהירות, מבניות וראייה פיננסית צופה פני עתיד.',
    'hero.cta': 'לתיאום פגישת ייעוץ',

    // Conflict Section
    'conflict.title': 'בהירות כשהפרטים מכריעים את התוצאות',
    'conflict.body': 'בישראל, החלטות מרכזיות תלויות לעתים קרובות ברישום, בחשיפת מס ובתאימות — לא רק בחוזה עצמו. עבור לקוחות בינלאומיים, הסיכון גדל כאשר צעדים משפטיים צריכים להתאים לדיווח זר, דרישות בנקאיות ומבני משפחה חוצי גבולות.',
    'conflict.body2': 'אנחנו מתחילים באימות ותיעוד — כך שהחלטות מתקבלות על סמך עובדות, לא הנחות. התפקיד שלנו הוא להפוך דרישות מורכבות להחלטות ברורות ומובנות שמגנות על הנכסים שלכם.',

    // Guide Section
    'guide.title': 'אודות המשרד',
    'guide.bio': 'משרד מאיה זיו נבנה סביב יתרון היברידי: אסטרטגיה משפטית מונחית משמעת פיננסית. המשרד משרת לקוחות בישראל ובחו"ל עם ייעוץ דו-לשוני וגישה מובנית מונעת תיעוד המיועדת לתמוך בביטחון לטווח ארוך.',
    'guide.punchline': 'אנחנו מתייחסים לכל צעד משפטי כהחלטה פיננסית עם השלכות ארוכות טווח.',
    'guide.cta': 'עוד על המשרד',

    // Methodology
    'method.title': 'תהליך מובנה — מאימות ועד ביצוע',
    'method.subtitle': 'לקוחות מקבלים תהליך מוגדר, לוחות זמנים ברורים ובדיקת נאותות קפדנית — עם סודיות ודיוק בכל שלב.',
    'method.step1.title': 'אימות בעלות וסטטוס',
    'method.step1.desc': 'בדיקת נסח, שעבודים, תכנון וייעוד לפני התחייבות.',
    'method.step2.title': 'מס ומבנה לטווח ארוך',
    'method.step2.desc': 'תכנון מוקדם להפחתת חשיפה ותמיכה בתאימות.',
    'method.step3.title': 'ביצוע ותיאום מרחוק',
    'method.step3.desc': 'ניתן לנהל עניינים מחו"ל, כולל תיעוד מובנה ותיאום חוצה גבולות בעת הצורך.',

    // Practice Areas
    'practice.title': 'תחומי התמחות',
    'practice.realEstate.title': 'נדל"ן והשקעות',
    'practice.realEstate.desc': 'רכישה מאובטחת ותכנון מס.',
    'practice.taxation.title': 'מס בינלאומי ותאימות',
    'practice.taxation.desc': 'דיווח חוצה גבולות ורגולציה בנקאית.',
    'practice.estate.title': 'תכנון משפחה ומורשת',
    'practice.estate.desc': 'צוואות, ירושה והעברה בין-דורית.',
    'practice.learnMore': 'למידע נוסף',
    'practice.additional.olim': 'עולים ותושבים חוזרים',
    'practice.additional.commercial': 'מסחרי ואזרחי',

    // Insights
    'insights.title': 'תובנות',
    'insights.readMore': 'המשך קריאה',
    'insights.viewAll': 'לכל המאמרים',
    'insights.article1.title': 'רכישת נכס בישראל כתושב חוץ',
    'insights.article1.snippet': 'יסודות משפטיים, מיסויים ורישומיים — עם בדיקת נאותות התומכת בבעלות תואמת.',
    'insights.article2.title': 'צוואות וירושה בישראל למשפחות חוצות גבולות',
    'insights.article2.snippet': 'תיאום בין תחומי שיפוט להבטחת אכיפות והפחתת סכסוכים ועיכובים.',
    'insights.article3.title': 'בדיקת נאותות משפטית לפני רכישת נכס בישראל',
    'insights.article3.snippet': 'נסח, סטטוס תכנוני והגנות חוזיות שמפחיתים חשיפה לפני החתימה.',

    // CTA
    'cta.title': 'האינטרסים שלכם ראויים לתשומת לב אישית',
    'cta.subtitle': 'כל פנייה מטופלת בסודיות, הכוונה מובנית ואסטרטגיה משפטית מדויקת — בין אם אתם בישראל או בחו"ל.',
    'cta.button': 'שלחו פנייה חסויה',

    // Footer
    'footer.brand': 'עורכת דין ונוטריון בתל אביב',
    'footer.services': 'שירותים',
    'footer.contact': 'צור קשר',
    'footer.legal': 'משפטי',
    'footer.disclaimer': 'הסתייגות',
    'footer.privacy': 'מדיניות פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.disclaimerText': 'אתר זה הינו למטרות מידע בלבד ואינו מהווה ייעוץ משפטי. אין יצירת יחסי עורך דין-לקוח באמצעות השימוש באתר זה.',
    'footer.copyright': '© 2024 מאיה זיו עו"ד. כל הזכויות שמורות.',

    // Contact Page
    'contact.title': 'צור קשר',
    'contact.subtitle': 'התחילו את המסע שלכם לבהירות משפטית',
    'contact.form.name': 'שם מלא',
    'contact.form.email': 'כתובת אימייל',
    'contact.form.phone': 'מספר טלפון',
    'contact.form.inquiry': 'אופי הפנייה',
    'contact.form.message': 'ההודעה שלכם',
    'contact.form.submit': 'שלח הודעה',
    'contact.form.success': 'תודה על פנייתכם. נחזור אליכם תוך 24-48 שעות.',
    'contact.inquiry.realEstate': 'עסקת נדל"ן',
    'contact.inquiry.taxation': 'מיסוי בינלאומי',
    'contact.inquiry.estate': 'ירושות וצוואות',
    'contact.inquiry.other': 'עניין משפטי אחר',

    // About Page
    'about.hero.title': 'ייעוץ משפטי שנבנה דרך עדשה פיננסית',
    'about.hero.subtitle': 'משרד בוטיק המגשר על הפער בין אסטרטגיה משפטית למשמעת פיננסית עבור לקוחות בינלאומיים בישראל.',
    'about.philosophy.title': 'גישה שונה לפרקטיקה משפטית',
    'about.philosophy.body': 'משרד מאיה זיו הוקם על הבנה פשוטה: עבור משקיעים ומשפחות בינלאומיים, חוזה משפטי לעולם אינו רק מסמך — הוא מכשיר פיננסי. פעילות בישראל דורשת יותר מידע משפטי בלבד; היא דורשת את היכולת לסנכרן בירוקרטיה מקומית עם סטנדרטים גלובליים.',
    'about.philosophy.body2': 'אנחנו מספקים הכוונה מובנית שמתרגמת מורכבות להחלטות. אנחנו הופכים דרישות רגולטוריות — מסטטוס רישום וחשיפת מס ועד תיעוד בנקאי — לתוכנית ברורה וניתנת לביצוע. המשרד משלב משמעת אנליטית עם אסטרטגיה משפטית, ומבטיח שלקוחות מקבלים את אותו סטנדרט של קפדנות מקצועית שהם מצפים לו גלובלית.',
    'about.attorney.title': 'מאיה זיו, עורכת דין ונוטריון',
    'about.attorney.body': 'מאיה זיו מביאה פרספקטיבה היברידית ייחודית לתחום המשפטי. עם הכשרה בינלאומית וניסיון מקצועי בפיננסים וחשבונאות, היא ניגשת לכל מקרה עם קפדנות פיננסית וראייה אסטרטגית של התוצאה.',
    'about.attorney.body2': 'אנחנו מעדיפים מניעה ומבנה. העבודה שלנו מתוכננת להפחית חיכוך, להגן על עמדות מוקדם ולמנוע מחלוקות לפני שהן מתעוררות. על ידי צפייה של מכשולים רגולטוריים ומבנה נכון של עסקאות מההתחלה, המטרה היא ליצור יציבות — להבטיח שההסדרים המשפטיים שלכם ישרתו את המורשת הפיננסית והאישית שלכם לטווח ארוך.',
    'about.serve.title': 'את מי אנחנו משרתים',
    'about.serve.body': 'הפרקטיקה שלנו מתאימה ביותר ללקוחות שמעריכים יסודיות על פני מהירות. אנחנו משתפים פעולה עם משקיעים בינלאומיים, תושבים חוזרים ומשפחות הדורשות רמה גבוהה של מעורבות ומדיניות "אפס הפתעות".',
    'about.serve.body2': 'בין אם אתם מנהלים נדל"ן בעל ערך גבוה, ענייני ירושה מורכבים או נכסים חוצי גבולות, הגישה שלנו מתוכננת עבור אלה המחפשים תהליך משפטי ממושמע, שיטתי ובטוח.',
    'about.expect.title': 'מה לקוחות יכולים לצפות',
    'about.expect.intro': 'ההתקשרות עם המשרד עוקבת אחר מסלול מוגדר ושקוף. אנחנו מאמינים שבהירות היא התרופה ללחץ, במיוחד כשמנהלים עניינים מרחוק.',
    'about.expect.doc.title': 'גישה מבוססת תיעוד',
    'about.expect.doc.desc': 'אנחנו מתחילים באימות. החלטות מתקבלות על סמך עובדות ורשומות רשמיות, לא הנחות.',
    'about.expect.timeline.title': 'לוחות זמנים ועמלות מוגדרים',
    'about.expect.timeline.desc': 'תבינו את מפת הדרכים, אבני הדרך ומבנה העמלות מההתחלה. ציפיות היקף ברורות מוגדרות מוקדם.',
    'about.expect.comm.title': 'תקשורת ישירה',
    'about.expect.comm.desc': 'לקוחות מקבלים הכוונה אישית ומגיבה. אנחנו מנהלים את המורכבות של הבירוקרטיה הישראלית כדי שתוכלו לקבל החלטות בביטחון.',
    'about.cta.title': 'התחילו שיחה',
    'about.cta.body': 'תוכנית ברורה היא הצעד הראשון להגנה על נכסים ומורשת.',
    'about.cta.button': 'לתיאום פגישת ייעוץ',

    // Service Pages - General
    'service.faq': 'שאלות נפוצות',

    // Estate Planning Page
    'estate.hero.title': 'ירושות ותכנון עיזבון בישראל למשפחות בינלאומיות',
    'estate.hero.subtitle': 'אסטרטגיות משפטיות להעברת עושר חוצת גבולות, צוואות דו-לשוניות וייפוי כוח מתמשך (ישראל).',
    'estate.challenge.title': 'ניהול עושר משפחתי על פני תחומי שיפוט',
    'estate.challenge.body': 'משפחות עם נכסים בישראל וזיקות לחו"ל מתמודדות עם נוף משפטי ייחודי. הליכי ירושה ישראליים לעתים קרובות מתקשרים עם חוקים זרים, יוצרים סכסוכים פוטנציאליים בנוגע לסמכות שיפוט וחבות מס. צוואה ישראלית סטנדרטית לעתים רחוקות מספיקה לעיזבון רב-לאומי.',
    'estate.challenge.body2': 'התפקיד שלנו הוא לתאם בין מערכות אלו. אנחנו מפתחים מבנים משפטיים שנועדו להרמוניזציה של הנכסים הישראליים שלכם עם תוכנית העיזבון הגלובלית, במטרה למנוע מבוי סתום מנהלי ולהגן על הכוונות שלכם.',
    'estate.wills.title': 'צוואות חוצות גבולות ואסטרטגיית ירושה',
    'estate.wills.body': 'אנחנו מנסחים צוואות דו-לשוניות העומדות בסטנדרטים משפטיים ישראליים קפדניים תוך התייחסות למבנה העיזבון הגלובלי שלכם. במקרים המתאימים, אנחנו מבנים צוואה ממוקדת ישראל המתיישרת עם צוואה זרה קיימת, במטרה להפחית חיכוך בהליכים ישראליים מבלי להתנגש עם תוכנית העיזבון העיקרית שלכם בחו"ל.',
    'estate.wills.compliance.title': 'ניסוח לתאימות',
    'estate.wills.compliance.desc': 'הכנת מסמכים העומדים בדרישות פורמליות ישראליות ובסטנדרטים ראייתיים.',
    'estate.wills.probate.title': 'ניהול ירושה',
    'estate.wills.probate.desc': 'ייצוג יורשים בקבלת צווי ירושה או צווי קיום צוואה ביעילות.',
    'estate.wills.conflict.title': 'הפחתת סכסוכים',
    'estate.wills.conflict.desc': 'ניסוח ברור וחד-משמעי שנועד למזער מחלוקות פרשניות בין מוטבים.',
    'estate.epa.title': 'ייפוי כוח מתמשך (ישראל)',
    'estate.epa.body': 'ייפוי כוח מתמשך הוא כלי לשמירה על שליטה. הוא מאפשר לכם למנות נציגים מהימנים לניהול ענייניכם האישיים והפיננסיים בישראל, אם לא תוכלו לעשות זאת בעתיד.',
    'estate.epa.body2': 'בניגוד לאפוטרופסות שמונתה על ידי בית משפט, ייפוי כוח מתמשך מאפשר לכם להגדיר את היקף הסמכות מראש. אנחנו מכינים מסמכים מקיפים ששומרים על האוטונומיה שלכם ומגדירים הוראות ברורות לניהול נכסים.',
    'estate.process.title': 'איך אנחנו עובדים: תהליך התכנון',
    'estate.process.step1.title': 'גילוי ומיפוי',
    'estate.process.step1.desc': 'אנחנו ממפים את הנכסים, תחומי השיפוט ודינמיקת המשפחה שלכם כדי להבין את התמונה המשפטית המלאה.',
    'estate.process.step2.title': 'אסטרטגיה ומבנה',
    'estate.process.step2.desc': 'אנחנו מציעים מבנה (מסמכים וצעדי תיאום) המתאים למטרות ותחומי השיפוט שלכם.',
    'estate.process.step3.title': 'ניסוח וביצוע',
    'estate.process.step3.desc': 'מסמכים מנוסחים דו-לשונית ונחתמים בצורה המתאימה — בישראל או בחו"ל — כדי לעמוד בדרישות ראייתיות.',
    'estate.process.step4.title': 'שמירה והכוונה',
    'estate.process.step4.desc': 'אנחנו מספקים הוראות לאחסון והכוונה למבצעי הצוואה שלכם להפעלה עתידית.',
    'estate.process.note': 'היקף ברור, צעדים הבאים מוגדרים ודרישות תיעוד נקבעים מההתחלה.',
    'estate.tax.title': 'שיקולי מס לעיזבונות חוצי גבולות',
    'estate.tax.body': 'משטר המס בישראל לגבי ירושות והעברות שונה מתחומי שיפוט מערביים רבים. העברת נכסים — בין אם בחייכם או אחרי — דורשת תזמון קפדני כדי להימנע מאירועי מס מיותרים.',
    'estate.tax.body2': 'אנחנו מסמנים נקודות מגע מס פוטנציאליות בישראל ומתאמים עם יועצים רלוונטיים בעת הצורך. המטרה שלנו היא להעריך את מבנה העיזבון שלכם כדי להפחית חשיפה נמנעת ולהגן על ערך המורשת העוברת לדור הבא.',
    'estate.financial.title': 'שירות משלים: הסכמים פיננסיים',
    'estate.financial.body': 'עבור זוגות עם נכסים משמעותיים, אנחנו מנסחים הסכמי ממון טרום-נישואין ולאחריהם דו-לשוניים. הסכמים אלה מספקים בהירות פיננסית ומאושרים על ידי בית המשפט או הנוטריון הרלוונטי לחיזוק האכיפות.',
    'estate.faq.q1': 'האם אני צריך צוואה נפרדת לנכסים הישראליים שלי?',
    'estate.faq.a1': 'במצבים חוצי גבולות רבים, צוואה ממוקדת ישראל יכולה להפחית חיכוך פרוצדורלי לנכסים בישראל. בעוד צוואות זרות ניתנות לעתים קרובות לאישור כאן, התהליך מורכב פרוצדורלית ואיטי יותר.',
    'estate.faq.q2': 'האם אפשר למנות תושב חוץ כמבצע הצוואה שלי?',
    'estate.faq.a2': 'כן, אם כי זה דורש צעדים פרוצדורליים ספציפיים. אנחנו מנחים לקוחות לגבי ההשלכות המעשיות של מינוי מבצעי צוואה המתגוררים מחוץ לישראל.',
    'estate.cta.title': 'תכננו לעתיד',
    'estate.cta.body': 'אבטחו את האינטרסים של משפחתכם עם תוכנית עיזבון מובנית ותקינה משפטית.',
    'estate.cta.button': 'בקשו ייעוץ חסוי',
    'estate.cta.note': 'מענה תוך 1-2 ימי עסקים',

    // Real Estate Page
    'realestate.hero.title': 'עורכת דין נדל"ן בתל אביב לרכישת נכס בישראל',
    'realestate.hero.subtitle': 'ייעוץ מקיף לרוכשים בינלאומיים: בדיקת נאותות, אסטרטגיית מס ורישום מאובטח.',
    'realestate.approach.title': 'יותר מעסקה — השקעה אסטרטגית',
    'realestate.approach.body': 'עבור לקוחות רבים, רכישת נכס בישראל מייצגת יותר מעסקת נדל"ן; היא ציון דרך אישי ופריסה הונית משמעותית עם השלכות פיננסיות ארוכות טווח.',
    'realestate.approach.body2': 'אנחנו מספקים הכוונה משפטית מובנית שנועדה לאבטח את הנכס. מבדיקות מקדימות ועד רישום בלשכת רישום המקרקעין (טאבו), כל שלב מטופל בבהירות, משמעת וראייה צופה פני עתיד להבטחת העברת בעלות תקינה.',
    'realestate.risk.title': 'הפחתת חשיפה בשוק מורכב',
    'realestate.risk.intro': 'דיני המקרקעין בישראל מטילים את נטל האימות על הקונה ("ייזהר הקונה"). בדיקת הנאותות שלנו מתוכננת לאתר ולנטרל סיכונים לפני שאתם חותמים:',
    'realestate.risk.liabilities.title': 'חבויות נסתרות',
    'realestate.risk.liabilities.desc': 'איתור עיקולים, חובות או משכנתאות קיימים הרשומים על הנכס.',
    'realestate.risk.planning.title': 'תכנון וייעוד',
    'realestate.risk.planning.desc': 'אימות שהנכס נבנה כחוק ותואם היתרי עירייה למניעת פיחות עתידי או קנסות.',
    'realestate.risk.tax.title': 'חשיפת מס',
    'realestate.risk.tax.desc': 'זיהוי בעיות תזמון או סיווגי תושבות שעלולים להפעיל חבויות מס מיותרות.',
    'realestate.tax.title': 'תכנון מס כחלק מהעסקה',
    'realestate.tax.body': 'מס רכישה בישראל הוא דינמי. תושבי חוץ כפופים בדרך כלל למדרגות מס שונות בהשוואה לעולים חדשים או תושבים חוזרים.',
    'realestate.tax.body2': 'אנחנו מתייחסים לתכנון מס כחלק אינטגרלי מהחוזה. בהסתמך על היכרות עמוקה עם רגולציית המס הישראלית, אנחנו מעריכים את הסטטוס שלכם לפני שמבנה העסקה מגובש סופית. המשרד מכין ומגיש תיקים כדי להבטיח שתיהנו מכל הפטורים החוקיים ותימנעו מחשיפה מיותרת.',
    'realestate.diligence.title': 'בדיקת נאותות קפדנית',
    'realestate.diligence.body': 'עסקה מאובטחת מתחילה באימות. לפני שמתחייבים, אנחנו עורכים ביקורת משפטית מקיפה של הנכס. זה כולל אימות בעלות, בדיקת שעבודים וסקירת סטטוס תכנוני.',
    'realestate.diligence.body2': 'ניתוח מובנה זה מאפשר לכם לקבל החלטה מושכלת על סמך עובדות מתועדות, ומבטיח שהנכס שאתם רואים הוא הנכס שאתם רוכשים משפטית.',
    'realestate.remote.title': 'ניהול העסקה מחו"ל',
    'realestate.remote.body': 'לקוחות המתגוררים מחוץ לישראל יכולים בדרך כלל לנהל את תהליך הרכישה מרחוק. הייצוג מתבצע באמצעות ייפוי כוח ספציפי החתום בקונסוליה ישראלית או בפני נוטריון מקומי עם אפוסטיל.',
    'realestate.remote.body2': 'זה מאפשר לנו לנהל את העסקה בשמכם — ממשא ומתן ועד רישום סופי — ומאפשר לכם להשלים את הרכישה בבטחה תוך שהייה בחו"ל.',
    'realestate.faq.q1': 'מתי צריך להתחיל תכנון מס?',
    'realestate.faq.a1': 'חבות מס צריכה להיבדק לפני חתימה על כל זיכרון דברים או חוזה. מבנה מוקדם מאפשר לנו להגיש בקשות לפטורים רלוונטיים (כגון הטבות עולים) ולמנוע תשלום יתר.',
    'realestate.faq.q2': 'איך הכספים מוגנים במהלך העסקה?',
    'realestate.faq.a2': 'כספים מוחזקים בדרך כלל בנאמנות ומשוחררים לפי לוח זמנים קפדני הקשור לאבני דרך משפטיות, כגון רישום הערת אזהרה לטובתכם.',
    'realestate.faq.q3': 'האם אפשר לקנות נכס לפני עלייה?',
    'realestate.faq.a3': 'כן. תושבי חוץ יכולים לרכוש נכס. אנחנו מייעצים כיצד תזמון הרכישה ביחס לתאריך העלייה שלכם משפיע על הטבות מס הרכישה.',
    'realestate.cta.title': 'אבטחו את ההשקעה שלכם',
    'realestate.cta.body': 'התחילו את הרכישה עם אסטרטגיה משפטית ופיננסית ברורה.',
    'realestate.cta.button': 'לתיאום פגישת ייעוץ',

    // Taxation Page
    'tax.hero.title': 'עורכת דין מיסוי ורגולציה בנקאית בתל אביב',
    'tax.hero.subtitle': 'דיווח חוצה גבולות, תכנון מס נדל"ן ותאימות הלבנת הון ללקוחות בינלאומיים.',
    'tax.context.title': 'עדשה פיננסית על אסטרטגיה משפטית',
    'tax.context.body': 'כיום, מס ותאימות קובעים האם עסקאות מאושרות, ממומנות ומושלמות. בין אם רוכשים נכס או מעבירים כספים, כל עסקה נושאת השלכות בישראל ואולי גם בחו"ל.',
    'tax.context.body2': 'אנחנו ניגשים לכל מקרה עם משמעת פיננסית. על ידי שילוב תכנון מס בתהליך המשפטי מהיום הראשון, אנחנו שואפים למזער חיכוך רגולטורי, לתמוך בתאימות מלאה ולתמוך במעמדכם מול מוסדות פיננסיים.',
    'tax.realEstate.title': 'תכנון מס נדל"ן',
    'tax.realEstate.body': 'הערכת מס היא הצעד הראשון בכל עסקת נכס. מדרגות המס בישראל למס רכישה ומס שבח משתנות בהתאם לתושבות וסטטוס.',
    'tax.realEstate.assessment.title': 'הערכה לפני חוזה',
    'tax.realEstate.assessment.desc': 'חישוב חבויות צפויות ובדיקת זכאות לפטורים רלוונטיים במידת האפשר לפני החתימה.',
    'tax.realEstate.ownership.title': 'תכנון בעלות',
    'tax.realEstate.ownership.desc': 'אנחנו עוזרים לכם להעריך אפשרויות בעלות ורישום מוקדם, בהתאמה לסטטוס ולמטרות ארוכות הטווח שלכם.',
    'tax.realEstate.filing.title': 'הגשה ודיווח',
    'tax.realEstate.filing.desc': 'ניהול הגשות לרשות המיסים עם תיעוד קפדני להפחתת שגיאות ועיכובים.',
    'tax.banking.title': 'רגולציה בנקאית ומקור כספים',
    'tax.banking.body': 'העברת הון לישראל הפכה מורכבת יותר עקב רגולציית הלבנת הון מחמירה. בנקים ישראליים דורשים תיעוד "מקור כספים" קפדני לפני קבלת העברות מחו"ל.',
    'tax.banking.body2': 'אנחנו מנחים לקוחות דרך בדיקת התאימות של הבנק. זה כולל בדרך כלל הכנת נרטיב מקור כספים מובנה וארגון מסמכים תומכים במיוחד לצוותי תאימות. אנחנו מתאמים ישירות מול הבנק לתמיכה בתהליך העברה תקין והקלת הבדיקה.',
    'tax.serve.title': 'האם השירות הזה מתאים לכם?',
    'tax.serve.body': 'שירות זה מיועד ללקוחות שמעדיפים תהליך מתועד ושקוף. אנחנו משתפים פעולה עם משקיעים ותושבים בינלאומיים שמבינים שתאימות היא המפתח לבטיחות הנכסים.',
    'tax.serve.compliance': 'תאימות קודם',
    'tax.serve.compliance.desc': 'אנחנו לא עוסקים בהעברות לא מתועדות או באסטרטגיות שנועדו לעקוף רגולציה.',
    'tax.serve.firstStep': 'צעד ראשון',
    'tax.serve.firstStep.desc': 'ההתקשרות מתחילה ברשימת תיעוד והערכת סיכונים לזיהוי דגלים אדומים פוטנציאליים מוקדם.',
    'tax.crossBorder.title': 'תיאום עם התחייבויות בינלאומיות',
    'tax.crossBorder.body': 'רשת האמנות של ישראל עשויה להשפיע על אופן הטיפול בהכנסות מסוימות וחובות דיווח, בהתאם לתחום השיפוט שלכם.',
    'tax.crossBorder.body2': 'אנחנו מסמנים שיקולים פוטנציאליים הקשורים לאמנות ומתאמים עם יועצי המס הזרים שלכם. בעוד שאנחנו לא מגישים דוחות מס זרים, אנחנו מבטיחים שהפעולות המשפטיות הישראליות שלכם מתקשרות בבהירות לצוות הגלובלי שלכם לשמירה על עמדת מס עקבית.',
    'tax.olim.title': 'תכנון לעולים ותושבים חוזרים',
    'tax.olim.body': 'עולים חדשים ותושבים חוזרים עשויים להיות זכאים להקלות מסוימות, כולל הקלת הדיווח ל-10 שנים במקרים מסוימים, בכפוף לכללי זכאות. אנחנו עוזרים לבנות תזמון ותיעוד לתמיכה במעבר תקין למערכת המס הישראלית.',
    'tax.faq.q1': 'האם אפשר לשלם מס רכישה ישראלי במטבע חוץ?',
    'tax.faq.a1': 'מיסים משולמים בדרך כלל בשקלים. אנחנו מנחים לקוחות לגבי תזמון, לוגיסטיקת המרה ושוברי תשלום כדי שהכספים יגיעו בזמן ובצורה הנדרשת.',
    'tax.faq.q2': 'האם הבנק הישראלי יקבל את ההעברה שלי אוטומטית?',
    'tax.faq.a2': 'תאימות אינה אוטומטית לעולם. העברות גדולות מפעילות בדיקות. אנחנו מכינים את תיק "מקור הכספים" מראש כדי להפחית את הסיכון להקפאה או דחייה של כספים.',
    'tax.faq.q3': 'מתי אני הופך לתושב מס בישראל?',
    'tax.faq.a3': 'תושבות נקבעת על ידי מבחן "מרכז החיים", לא רק אזרחות. אנחנו מייעצים לגבי הקריטריונים המשפטיים וכיצד הנוכחות שלכם בישראל משפיעה על הסטטוס שלכם.',
    'tax.cta.title': 'תאימות אסטרטגית',
    'tax.cta.body': 'התחילו עם תוכנית מתועדת שבנקים ורשויות יכולים לבדוק.',
    'tax.cta.button': 'בקשו ייעוץ חסוי',
  },
};

// NOTE: Keep a stable Context instance across hot-reloads to avoid "must be used within a Provider" errors.
// This is especially important in development, since we frequently edit translations.
const _global = globalThis as unknown as {
  __mayaLanguageContext?: React.Context<LanguageContextType | undefined>;
};

const LanguageContext =
  _global.__mayaLanguageContext ?? createContext<LanguageContextType | undefined>(undefined);

_global.__mayaLanguageContext = LanguageContext;

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('maya-ziv-lang');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'he';

  useEffect(() => {
    localStorage.setItem('maya-ziv-lang', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};