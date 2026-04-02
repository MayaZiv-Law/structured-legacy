#!/usr/bin/env node
/**
 * translate-standalone.mjs
 * 
 * Self-contained script: translates all Maya Ziv Law website English text to Hebrew via DeepL.
 * Save this file ANYWHERE on your computer and run:
 *   node translate-standalone.mjs
 * 
 * Output: translations_output.json (in the same folder)
 */

const DEEPL_KEY = 'e4c2d924-f456-4f15-8cbf-dc5412b0868a:fx';
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const englishData = {
  "context": {
    "nav.firm": "About the Firm",
    "nav.about": "About",
    "nav.expertise": "Expertise",
    "nav.realEstate": "Real Estate",
    "nav.taxation": "Tax and Compliance",
    "nav.estate": "Family and Legacy",
    "nav.olim": "Olim Hadashim and Returning Residents",
    "nav.commercial": "Commercial and Civil",
    "nav.insights": "Insights",
    "nav.globalClients": "Global Clients",
    "nav.contact": "Contact",
    "nav.schedule": "Schedule Consultation",
    "hero.tagline": "Clarity in a Changing World",
    "hero.title": "Attorney in Israel",
    "hero.subtitle1": "Premier legal counsel must be as unique as the clients it serves. At Maya Ziv Law, every matter receives the personal focus it deserves and the depth and reach that serious work demands.",
    "hero.subtitle2": "",
    "guide.title": "About Maya Ziv Law",
    "guide.bio": "The firm operates as a dedicated partner to each client, creating original solutions for the most complex domestic and cross border matters. The firm is based in Israel.",
    "guide.punchline": "We think ahead for our clients, using insight and judgment to anticipate their needs.",
    "guide.cta": "More About the Firm",
    "parallax.quote": "The details that seem technical are often the ones that determine the outcome.",
    "method.step1.title": "Our Clients",
    "method.step1.desc": "Private individuals, families, and businesses who bring us their most important matters, knowing they will receive the personal attention their situation deserves. Some are based in Israel. Others come from across the world.",
    "method.step2.title": "No Detail Overlooked",
    "method.step2.desc": "We bring insight and judgment to every situation. Whether navigating a real estate acquisition, managing cross border compliance, or structuring an estate, every matter is handled with the attention it deserves.",
    "method.step3.title": "Fully Informed, Always",
    "method.step3.desc": "Clients know exactly where their matter stands at every stage. What has been resolved, what is in progress, what requires their input.",
    "method.step4.title": "Full Coverage, One Relationship",
    "method.step4.desc": "The expansive reach and technical depth of a premier practice, with the individual attention each situation requires. Through a network of trusted advisors across jurisdictions, coordinated through a single point of contact. Counsel available in Hebrew and English.",
    "method.step5.title": "Deep Understanding",
    "method.step5.desc": "Every matter begins with listening. We take the time to understand what clients are truly trying to achieve, not just the immediate legal question.",
    "method.step6.title": "Areas of Practice",
    "method.step6.desc": "We specialize in real estate transactions and due diligence. Taxation, cross border compliance. Estate planning, wills, and succession. Commercial agreements and civil disputes. Both domestic and international.",
    "practice.title": "Areas of Practice",
    "practice.realEstate.title": "Real Estate and Investment",
    "practice.realEstate.desc": "Secure acquisition and tax planning.",
    "practice.taxation.title": "International Tax and Compliance",
    "practice.taxation.desc": "Cross border reporting and banking regulation.",
    "practice.estate.title": "Family and Legacy Planning",
    "practice.estate.desc": "Wills, inheritance, and intergenerational transfer.",
    "practice.learnMore": "Learn More",
    "practice.olim.desc": "Legal guidance for new immigrants and returning residents.",
    "practice.commercial.desc": "Contracts, risk allocation, and business advisory.",
    "practice.additional.olim": "Olim Hadashim and Returning Residents",
    "practice.additional.commercial": "Commercial and Civil",
    "insights.title": "Insights",
    "insights.readMore": "Continue Reading",
    "insights.viewAll": "View All Insights",
    "insights.hero.title": "Legal Insights and Strategic Commentary",
    "insights.hero.subtitle": "Practical guidance on Israeli real estate, cross border taxation, compliance, and legacy planning.",
    "insights.philosophy.title": "Clarity for Cross Border Decisions",
    "insights.philosophy.body": "Our insights are written to be practical. Structured explanations, key considerations, and common pitfalls to flag early. The goal is to help you ask better questions and understand the legal roadmap before committing to a transaction.",
    "article.notFound": "Article Not Found",
    "article.backToInsights": "Back to Insights",
    "article.readMore": "Want to Read More?",
    "article.readMoreBody": "Return to our insights page for more articles and professional content.",
    "article.allArticles": "All Articles",
    "insights.article1.title": "Buying Property in Israel as a Foreign Resident: Legal and Tax Essentials",
    "insights.article1.snippet": "Foreign residents must address unique legal, tax, and registration requirements when purchasing property in Israel. Clear due diligence and structured planning ensure a compliant and secure transaction.",
    "insights.article2.title": "Wills and Inheritance in Israel: Ensuring Cross Border Validity",
    "insights.article2.snippet": "Cross border families must align Israeli inheritance procedures with foreign wills and overseas probate rules. Coordinated planning ensures enforceability and prevents unnecessary legal conflicts.",
    "insights.article3.title": "Buying Property in Israel: Essential Legal Checks for Domestic Buyers",
    "insights.article3.snippet": "Domestic buyers must verify ownership rights, planning status, and contractual protections before committing to a property purchase. Structured legal checks reduce exposure and support a transparent and compliant transaction.",
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "When should I start tax planning?",
    "faq.a1": "Tax planning on an Israeli property transaction must begin before any document is signed, ideally at the negotiation stage. The applicable Purchase Tax rate depends on your residency status, whether this is your first property in Israel, and the timing of the transaction relative to any Aliyah or relocation. Getting this wrong after the fact is expensive and in some cases irreversible. We assess your tax position at the outset, as part of the transaction structure.",
    "faq.q2": "How are buyer funds protected during the transaction?",
    "faq.a2": "Buyer funds in Israeli property transactions are released to the seller in stages, tied to specific legal milestones rather than as a lump sum. At each stage, a corresponding security interest is registered in the buyer's favor at the Land Registry, known as a Hearat Azhara or warning note. This mechanism ensures that if the transaction does not complete, the buyer's financial exposure is limited. The payment schedule and its linkage to milestones is one of the most important elements of the purchase contract and is negotiated before signing.",
    "faq.q3": "Can I purchase property before making Aliyah?",
    "faq.a3": "Yes. Non residents can purchase property in Israel. The more important question is the timing of the purchase relative to your Aliyah date, as this affects your Purchase Tax eligibility. In some cases purchasing before making Aliyah preserves certain benefits. In others, waiting is the better structure. This analysis is specific to each client's situation and should be done before any commitment is made.",
    "faq.q4": "Can I pay Israeli purchase tax in foreign currency?",
    "faq.a4": "No. Purchase Tax payments to the Israeli Tax Authority are made in New Israeli Shekels. For clients transferring funds from abroad, this requires coordinating currency conversion, timing the transfer to limit exchange rate exposure, and ensuring the receiving Israeli bank accepts the funds. We manage this process as part of the transaction.",
    "faq.q5": "Will the Israeli bank automatically accept my transfer?",
    "faq.a5": "No. Israeli banks operate under strict anti money laundering and compliance requirements. An international transfer that arrives without prior documentation establishing the source of funds, the purpose of the transfer, and the underlying transaction is likely to be held or returned. Preparing the source of funds file in advance and coordinating with the bank before the transfer is initiated is standard practice on any cross border transaction. We handle this as part of our representation.",
    "faq.q6": "When do I become a tax resident of Israel?",
    "faq.a6": "Israeli tax residency is determined by the center of life test, a factual assessment that includes physical presence of over 183 days in a tax year or over 425 days across three consecutive years, as well as the location of your economic and personal ties. It is not determined by citizenship or Aliyah status alone. The consequences of becoming an Israeli tax resident are significant and affect reporting obligations on worldwide income. We advise on residency classification as part of pre arrival planning.",
    "faq.q7": "Is a foreign will valid in Israel?",
    "faq.a7": "A foreign will can be recognized in Israel but it must go through a probate process that includes expert opinions on the relevant foreign law. This process adds time, cost, and uncertainty, particularly when the estate includes Israeli real estate. The more reliable approach is to draft a separate Israeli will that addresses Israeli assets specifically, coordinated with your foreign will so that the two instruments do not conflict. We advise on both the drafting and the coordination across jurisdictions.",
    "faq.q8": "Can I appoint an estate administrator residing outside Israel?",
    "faq.a8": "Yes, though Israeli courts may require additional procedural steps including the provision of guarantees before appointing a non resident administrator. The practical implications depend on the composition of the estate and the complexity of the proceedings. We advise on executor selection as part of the estate planning process, with attention to the realistic demands of the role and the client's family and asset structure.",
    "faq.q9": "What is the difference between an inheritance order and a probate order?",
    "faq.a9": "A Probate Order (Kiyum Tzava'a) is issued by the Israeli Registrar of Inheritance when the deceased left a valid will. It confirms the will's validity and authorizes its execution. An Inheritance Order (Tzav Yerusha) is issued when there is no valid will, and estate distribution then follows the statutory provisions of Israel's Succession Law. In cross border estates, coordinating the Israeli process with foreign proceedings is essential to avoid conflicts between jurisdictions.",
    "cta.title": "When the Matter Requires Both Legal and Financial Judgment",
    "cta.subtitle": "Clients in Israel and abroad turn to Maya Ziv Law for transactions where precision matters. Inquiries welcome in Hebrew and English.",
    "cta.button": "Schedule a Consultation",
    "cta.buttonSecondary": "Initial Fit Assessment",
    "footer.brand": "Attorney in Israel",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.disclaimer": "Disclaimer",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.disclaimerText": "This website is for informational purposes only and does not constitute legal advice. No attorney client relationship is formed by use of this site.",
    "footer.copyright": "© 2026 Maya Ziv Law. All rights reserved.",
    "contact.title": "Contact Us",
    "contact.subtitle": "Begin your journey to legal clarity",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.inquiry": "Nature of Inquiry",
    "contact.form.message": "Your Message",
    "contact.form.submit": "Send Message",
    "contact.form.success": "Thank you for your message. We will respond within 24 to 48 hours.",
    "contact.inquiry.realEstate": "Real Estate Transaction",
    "contact.inquiry.taxation": "International Taxation",
    "contact.inquiry.estate": "Estate Planning",
    "contact.inquiry.other": "Other Legal Matter",
    "about.hero.title": "About Maya Ziv Law",
    "about.mainBody": "Our clients bring us matters that require both legal precision and judgment. We treat each one as a unique situation with its own stakes, its own complexity, and its own required outcome.",
    "about.cta.title": "Tell Us About Your Matter",
    "about.cta.body": "From the first conversation, clients know exactly what their matter involves and what to expect next.",
    "about.cta.button": "Get in Touch",
    "service.faq": "Common Questions",
    "estate.hero.title": "Protecting Your Family Across Borders",
    "estate.hero.subtitle": "Structured legal planning for cross border wealth transfer, bilingual wills, and Enduring Power of Attorney under Israeli law.",
    "estate.challenge.title": "Managing Family Wealth Across Jurisdictions",
    "estate.challenge.body": "Families with assets in Israel and ties to other countries face a specific challenge ensuring that wealth passes to the next generation efficiently, in accordance with your wishes, and without unnecessary tax events or procedural delays. Israeli inheritance law operates under its own rules of formality, jurisdiction, and procedure. When foreign wills, foreign beneficiaries, or assets in multiple countries are involved, the complexity increases significantly. We develop structured estate plans that integrate Israeli inheritance law with relevant foreign legal frameworks. The objective is to prevent disputes, minimize probate delays, and reduce exposure to double taxation or conflicting succession orders.",
    "estate.challenge.body2": "",
    "estate.wills.title": "Wills, Succession, and Cross Border Coordination",
    "estate.wills.body": "We prepare Israel specific wills and comprehensive estate plans for clients who hold assets or maintain family connections across jurisdictions. Each document is drafted to meet Israeli formal and evidentiary requirements while coordinating with any existing foreign testamentary instruments.",
    "estate.wills.compliance.title": "Drafting for Compliance",
    "estate.wills.compliance.desc": "Preparing wills that satisfy the formal requirements of Israeli law, including witness provisions and language considerations for bilingual instruments.",
    "estate.wills.probate.title": "Probate and Succession Orders",
    "estate.wills.probate.desc": "Representing heirs in obtaining a Probate Order (Kiyum Tzava'a) where a valid will exists, or a Succession Order (Tzvav Yerusha) where no will was left, through the Registrar of Inheritance or the Family Court.",
    "estate.wills.conflict.title": "Minimizing Conflict",
    "estate.wills.conflict.desc": "Clear, unambiguous drafting that reduces the scope for interpretation disputes among beneficiaries. Where family dynamics are sensitive, we structure instruments to limit the grounds for challenge.",
    "estate.epa.title": "Enduring Power of Attorney",
    "estate.epa.body": "An Enduring Power of Attorney (EPA) is a forward looking legal instrument that allows you to designate trusted individuals to manage your personal, medical, and financial affairs in Israel should you become unable to do so. Unlike court appointed guardianship, an EPA enables you to define the scope of authority, the identity of your representatives, and the conditions under which the instrument takes effect.",
    "estate.epa.body2": "We prepare comprehensive, court compliant EPA documents that preserve your autonomy, reflect your intentions, and provide your family with clear instructions for a situation that most people prefer to plan for in advance rather than leave to judicial discretion.",
    "estate.process.title": "How We Work",
    "estate.process.step1.title": "Discovery and Mapping",
    "estate.process.step1.desc": "We identify and map your assets, jurisdictions, beneficiaries, and family dynamics to understand the full legal and financial picture.",
    "estate.process.step2.title": "Strategy and Structure",
    "estate.process.step2.desc": "We propose a structure consisting of documents and coordination steps aligned with your objectives and the requirements of each jurisdiction involved.",
    "estate.process.step3.title": "Drafting and Execution",
    "estate.process.step3.desc": "Documents are drafted bilingually where required and executed in the form prescribed by Israeli law. For clients abroad, execution can take place at a consulate or before a notary with apostille.",
    "estate.process.step4.title": "Safekeeping and Guidance",
    "estate.process.step4.desc": "We provide instructions for secure storage and practical guidance for executors on future activation, so that the plan works when it is needed.",
    "estate.process.note": "Clear scope, defined next steps, and documentation requirements are established from the outset.",
    "estate.tax.title": "Tax Considerations for Cross Border Estates",
    "estate.tax.body": "Israel's tax treatment of inheritance and lifetime transfers differs from that of many Western jurisdictions. Transferring assets, whether during one's lifetime or after death, may trigger tax events that vary depending on the nature of the asset, the residency of the parties, and the timing of the transfer.",
    "estate.tax.body2": "We identify potential tax exposure at the outset and coordinate with relevant advisors in other jurisdictions where needed. The objective is to structure the estate in a way that reduces avoidable liability and protects the value of the legacy passing to the next generation.",
    "estate.financial.title": "Prenuptial and Postnuptial Agreements",
    "estate.financial.body": "For domestic and international couples, we prepare bilingual agreements in English and Hebrew that address property ownership, financial arrangements, and asset protection across borders. Each agreement is drafted with precision and, where required, approved by a court or notary to ensure enforceability under Israeli law.",
    "estate.faq.q1": "Is a foreign will valid in Israel?",
    "estate.faq.a1": "A foreign will can be recognized in Israel but it must go through a probate process that includes expert opinions on the relevant foreign law. This process adds time, cost, and uncertainty, particularly when the estate includes Israeli real estate. The more reliable approach is to draft a separate Israeli will that addresses Israeli assets specifically, coordinated with your foreign will so that the two instruments do not conflict. We advise on both the drafting and the coordination across jurisdictions.",
    "estate.faq.q2": "Can I appoint an estate administrator residing outside Israel?",
    "estate.faq.a2": "Yes, though Israeli courts may require additional procedural steps including the provision of guarantees before appointing a non resident administrator. The practical implications depend on the composition of the estate and the complexity of the proceedings. We advise on executor selection as part of the estate planning process, with attention to the realistic demands of the role and the client's family and asset structure.",
    "estate.faq.q3": "What is the difference between an inheritance order and a probate order?",
    "estate.faq.a3": "A probate order, Kiyum Tzava'a, is issued by the Israeli Registrar of Inheritance when the deceased left a valid will. It confirms the will's validity and authorizes its execution. An inheritance order, Tzav Yerusha, is issued when there is no valid will, and estate distribution then follows the statutory provisions of Israel's Succession Law. In cross border estates, coordinating the Israeli process with foreign proceedings is essential to avoid conflicts between jurisdictions.",
    "estate.faq.q4": "Can probate proceedings be managed remotely?",
    "estate.faq.a4": "Yes. We handle the entire process with the Registrar of Inheritance or the Family Court, as well as coordination with banks and the Land Registry, through a power of attorney. You are not required to be physically present in Israel to obtain the order or to administer the estate.",
    "estate.cta.title": "Planning That Protects What Matters",
    "estate.cta.body": "Structured legal planning that supports your interests today and safeguards your family's position over time. Inquiries welcome in English and Hebrew.",
    "estate.cta.button": "Begin Your Estate Plan",
    "estate.cta.note": "Response within one to two business days.",
    "realestate.hero.title": "Real Estate",
    "realestate.hero.subtitle": "Guiding domestic and international clients through every stage of acquiring property in Israel.",
    "realestate.approach.title": "Acquiring Property in Israel",
    "realestate.approach.body": "For many clients, acquiring property in Israel represents more than an investment. It is a personal milestone and a strategic decision with long term financial implications. Israeli real estate law is technically demanding. Title verification, planning compliance, tax classification, and staged payment structures each carry consequences if mishandled. We provide seamless legal guidance throughout the entire acquisition process, from preliminary due diligence through contract negotiation to final registration at the Israel Land Registry (Tabu).",
    "realestate.approach.body2": "Each stage is handled with clarity, discipline, and foresight, ensuring a smooth and secure transaction. Whether you are purchasing your first home, adding to an investment portfolio, or relocating from abroad, the legal strategy is tailored to your circumstances from the outset.",
    "realestate.risk.title": "Identifying and Neutralizing Risk Before You Commit",
    "realestate.risk.intro": "Israeli real estate law places the burden of verification squarely on the buyer. Our due diligence process is designed to surface and address exposure before any binding commitment is made",
    "realestate.risk.liabilities.title": "Title and Encumbrances",
    "realestate.risk.liabilities.desc": "Confirming registered ownership and detecting any liens, mortgages, caveats, or third party rights that could affect the transaction or limit future use.",
    "realestate.risk.planning.title": "Planning and Permit Compliance",
    "realestate.risk.planning.desc": "Verifying that the property was built in accordance with approved permits and that no open enforcement proceedings, deviation orders, or building code violations exist that could trigger fines or devaluation.",
    "realestate.risk.tax.title": "Tax Exposure",
    "realestate.risk.tax.desc": "Analyzing the client's residency status, acquisition timing, and transaction structure to identify the applicable Purchase Tax bracket and any Capital Gains exposure, and to ensure that no avoidable liability is triggered.",
    "realestate.tax.title": "Tax and Regulatory Considerations",
    "realestate.tax.body": "Purchase Tax (Mas Rechisha) in Israel is calculated according to a tiered bracket system that varies based on the buyer's classification. Israeli resident, foreign resident, new immigrant (Oleh), or returning resident (Toshav Hozer). The applicable rate can differ substantially between categories, and misclassification, whether by omission or by poor timing, can result in significant overpayment.",
    "realestate.tax.body2": "We assess each client's tax position at the outset of every transaction. Filings to the Israel Tax Authority are prepared and submitted with careful attention to deadlines, documentation, and eligibility for any lawful relief. Clients who qualify for reduced rates under immigration or residency provisions receive structured guidance on the documentation and timing required to secure those benefits.",
    "realestate.diligence.title": "Comprehensive Legal Due Diligence",
    "realestate.diligence.body": "A secure acquisition begins with verification. Before any contractual commitment, we conduct a thorough legal audit of the property, covering registered title, encumbrances, planning history, building permits, and any pending administrative or legal proceedings that could affect the asset.",
    "realestate.diligence.body2": "This structured analysis ensures that the property you acquire corresponds to the legal and physical reality you were shown. Clients make decisions based on documented facts, not assumptions.",
    "realestate.remote.title": "Representation for Clients Outside Israel",
    "realestate.remote.body": "Clients who reside abroad can complete the entire acquisition remotely. We act under an irrevocable power of attorney, signed at an Israeli consulate or before a notary public with apostille certification. This instrument enables full legal representation from negotiation through to final registration, without requiring the client's physical presence in Israel at any stage.",
    "realestate.remote.body2": "We manage every step of the process on the client's behalf. Contract negotiation, due diligence, tax filings, coordination with the seller's counsel, and registration at the Land Registry. Communication is maintained throughout in English and Hebrew.",
    "realestate.faq.q1": "When should I start tax planning?",
    "realestate.faq.a1": "Tax planning on an Israeli property transaction must begin before any document is signed, ideally at the negotiation stage. The applicable Purchase Tax rate depends on your residency status, whether this is your first property in Israel, and the timing of the transaction relative to any Aliyah or relocation. Getting this wrong after the fact is expensive and in some cases irreversible. We assess your tax position at the outset, as part of the transaction structure.",
    "realestate.faq.q2": "How are buyer funds protected during the transaction?",
    "realestate.faq.a2": "Buyer funds in Israeli property transactions are released to the seller in stages, tied to specific legal milestones rather than as a lump sum. At each stage, a corresponding security interest is registered in the buyer's favor at the Land Registry, known as a Hearat Azhara or warning note. This mechanism ensures that if the transaction does not complete, the buyer's financial exposure is limited. The payment schedule and its linkage to milestones is one of the most important elements of the purchase contract and is negotiated before signing.",
    "realestate.faq.q3": "Can I purchase property before making Aliyah?",
    "realestate.faq.a3": "Yes. Non residents can purchase property in Israel. The more important question is the timing of the purchase relative to your Aliyah date, as this affects your Purchase Tax eligibility. In some cases purchasing before making Aliyah preserves certain benefits. In others, waiting is the better structure. This analysis is specific to each client's situation and should be done before any commitment is made.",
    "realestate.cta.title": "Your Property, Our Priority",
    "realestate.cta.body": "Whether you are buying your first home in Israel or adding to an existing portfolio, we are here to guide you through every legal and financial step. Inquiries welcome in English and Hebrew.",
    "realestate.cta.button": "Discuss Your Property Plans",
    "tax.hero.title": "Tax and Compliance",
    "tax.hero.subtitle": "Navigating Israeli tax obligations, banking compliance, and cross border coordination so you can move capital, close transactions, and stay compliant across jurisdictions.",
    "tax.context.title": "Getting Your Tax Position Right from the Start",
    "tax.context.body": "Tax and regulatory compliance determine whether transactions are approved, funded, and completed. Whether you are purchasing property, transferring capital, or restructuring holdings, every transaction carries implications in Israel and potentially in other jurisdictions. A misstep in classification, timing, or documentation can result in penalties, blocked funds, or lost treaty benefits.",
    "tax.context.body2": "We integrate tax planning into the legal process from the outset, working to minimize regulatory friction, support full compliance, and protect your standing with Israeli financial institutions and tax authorities. The goal is a clear, documented position before any commitment is made.",
    "tax.realEstate.title": "Real Estate Tax Planning",
    "tax.realEstate.body": "Tax assessment is the critical first step of any property transaction in Israel. The brackets for Purchase Tax (Mas Rechisha) and Capital Gains Tax (Mas Shevach) vary based on your residency classification, the nature of the property, and whether other properties are held.",
    "tax.realEstate.assessment.title": "Pre Contract Assessment",
    "tax.realEstate.assessment.desc": "Calculating projected tax liabilities, identifying the correct residency classification, and confirming eligibility for any applicable relief before a binding commitment is made.",
    "tax.realEstate.ownership.title": "Ownership and Structure Planning",
    "tax.realEstate.ownership.desc": "Evaluating registration and ownership options aligned with your status, family structure, and long term financial objectives.",
    "tax.realEstate.filing.title": "Filing and Reporting",
    "tax.realEstate.filing.desc": "Preparing and submitting all declarations to the Israel Tax Authority with precise documentation, within the statutory deadlines, to avoid interest, penalties, and administrative delays.",
    "tax.banking.title": "Banking Regulation and Source of Funds",
    "tax.banking.body": "Transferring capital to or from Israel requires strict compliance with anti money laundering regulations and banking guidelines. Israeli banks conduct their own due diligence on incoming funds, and transfers that are not supported by clear documentation of source and purpose may be delayed, rejected, or flagged for further review.",
    "tax.banking.body2": "We prepare comprehensive source of funds files and coordinate directly with the receiving bank to facilitate smooth acceptance. We also assist in preparing ongoing tax declarations, aligning Israeli reporting obligations with international requirements including FATCA and relevant treaty provisions to reduce the risk of double taxation.",
    "tax.serve.title": "Is This Service Right for You?",
    "tax.serve.body": "This service is designed for clients who prioritize a documented, transparent process. We partner with international investors and private clients who understand that compliance is the key to asset safety.",
    "tax.serve.compliance": "Compliance First",
    "tax.serve.compliance.desc": "Every engagement is built on documented verification, transparent timelines, and a structured process that prioritizes regulatory accuracy over speed.",
    "tax.serve.firstStep": "First Step",
    "tax.serve.firstStep.desc": "Engagement begins with a structured assessment of your tax position, residency status, and reporting obligations to establish a clear compliance roadmap.",
    "tax.crossBorder.title": "Coordination with International Tax Obligations",
    "tax.crossBorder.body": "Israel's network of bilateral tax treaties may affect how income, gains, and reporting obligations are treated depending on your jurisdiction of residence or citizenship.",
    "tax.crossBorder.body2": "We identify potential treaty related considerations and coordinate with your foreign tax advisors to maintain a consistent tax position across jurisdictions. While we do not file foreign tax returns, we ensure that every Israeli legal action is documented and communicated clearly to your global advisory team.",
    "tax.olim.title": "Tax Planning for Olim Hadashim and Returning Residents",
    "tax.olim.body": "New immigrants (Olim Hadashim) and qualifying returning residents (Toshav Hozer Vatik) may be eligible for significant tax and reporting reliefs. These include reduced Purchase Tax rates on a first residential property in Israel and, for those who became Israeli residents before January 1, 2026, the ten year exemption from reporting on foreign source income. For those arriving from 2026 onward, the reporting exemption no longer applies, but additional Israeli source income benefits may be available depending on the year of arrival and legislative developments. These benefits are subject to strict eligibility criteria, classification rules, and timing requirements. The distinction between an Oleh Hadash and a Toshav Hozer Vatik carries different entitlements, and the date of arrival, the date of establishing tax residency, and the timing of first transactions in Israel all affect which reliefs are available. We help clients map their status, understand the implications of each classification, and structure the timing and documentation of their transition to support a compliant and tax efficient entry into the Israeli system.",
    "tax.faq.q1": "Can I pay Israeli Purchase Tax in foreign currency?",
    "tax.faq.a1": "No. Purchase Tax payments to the Israel Tax Authority are made in New Israeli Shekels. For clients transferring funds from abroad, this requires coordinating currency conversion, timing the transfer to limit exchange rate exposure, and ensuring the receiving Israeli bank accepts the funds. We manage this process as part of the transaction.",
    "tax.faq.q2": "Will the Israeli bank automatically accept my transfer?",
    "tax.faq.a2": "No. Israeli banks operate under strict anti money laundering and compliance requirements. An international transfer that arrives without prior documentation establishing the source of funds, the purpose of the transfer, and the underlying transaction is likely to be held or returned. Preparing the source of funds file in advance and coordinating with the bank before the transfer is initiated is standard practice on any cross border transaction. We handle this as part of our representation.",
    "tax.faq.q3": "When do I become a tax resident of Israel?",
    "tax.faq.a3": "Israeli tax residency is determined by the center of life test, a factual assessment that includes physical presence of over 183 days in a tax year or over 425 days across three consecutive years, as well as the location of your economic and personal ties. It is not determined by citizenship or Aliyah status alone. The consequences of becoming an Israeli tax resident are significant and affect reporting obligations on worldwide income. We advise on residency classification as part of pre arrival planning.",
    "tax.cta.title": "Clarity Before You Commit",
    "tax.cta.body": "Start with a structured tax assessment that turns uncertainty into documented decisions. Inquiries welcome in English and Hebrew.",
    "tax.cta.button": "Request a Tax Review",
    "olim.hero.title": "Legal Counsel for Olim Hadashim and Returning Residents",
    "olim.hero.subtitle": "Clear, personal legal guidance for one of life's most meaningful transitions.",
    "olim.context.title": "A New Chapter, Structured from Day One",
    "olim.context.body": "Beginning a new chapter in Israel brings opportunity, complexity, and important legal choices. The decisions you make in the first months of arrival, from how you classify your residency to when you purchase property and how you transfer capital, will affect your tax position, banking relationships, and financial structure for years to come.\\n\\nWe provide patient, personalized, and structured legal guidance for Olim Hadashim and Returning Residents. Each client receives a clear roadmap tailored to their specific situation, so that no critical step is missed and no benefit is forfeited through poor timing or incomplete documentation.",
    "olim.context.body2": "",
    "olim.framework.title": "The Soft Landing Framework",
    "olim.framework.planning.title": "Pre Arrival Planning",
    "olim.framework.planning.desc": "Reviewing the client's residency status, asset profile, and family structure before arrival. Identifying timing sensitive decisions and positioning the client to preserve eligibility for available benefits.",
    "olim.framework.property.title": "Property Acquisition Coordination",
    "olim.framework.property.desc": "Managing the legal aspects of purchasing a first property in Israel, including due diligence, contract negotiation, tax filing, and registration, with particular attention to the interaction between purchase timing and Oleh or returning resident status.",
    "olim.framework.banking.title": "Banking and Capital Transfers",
    "olim.framework.banking.desc": "Preparing source of funds documentation, coordinating with the receiving Israeli bank, and ensuring that international transfers are accepted without unnecessary delay or complication.",
    "olim.framework.peace.title": "Bilingual, Cross Border Support",
    "olim.framework.peace.desc": "We communicate in both English and Hebrew and coordinate with the client's foreign advisors where needed. The goal is to translate complex Israeli legal processes into clear, practical steps, providing confidence during one of life's most significant transitions.",
    "olim.tax.title": "Tax Positioning for Olim Hadashim and Returning Residents",
    "olim.tax.body": "New immigrants and qualifying returning residents may be eligible for specific reliefs, including reduced Purchase Tax rates and the ten year exemption from reporting on foreign source income. These benefits are subject to strict eligibility criteria, and correct timing, classification, and documentation are essential to securing them.",
    "olim.tax.body2": "We help clients understand how their specific circumstances affect their classification, what documentation is required, and how the timing of their arrival and first transactions should be structured to support a compliant and tax efficient transition into the Israeli system.",
    "olim.clients.title": "Who This Service Is For",
    "olim.clients.body": "This practice area is designed for individuals and families relocating to Israel who hold significant assets, foreign income, or cross border financial structures. Whether you are moving from the United States, the United Kingdom, Europe, or elsewhere, we bring the same level of attention and care to every engagement. Our clients value a disciplined, compliance first approach and understand that the legal and financial decisions made during the transition period will shape their position in Israel for years to come.",
    "olim.expect.title": "What to Expect",
    "olim.expect.body": "Engagement begins with a structured intake. A tailored documentation checklist, a residency and tax status assessment, and a coordinated roadmap with clearly defined next steps. Every client knows what is required, when it is required, and why it matters.",
    "olim.expect.item1": "Documentation checklist tailored to your situation",
    "olim.expect.item2": "Residency and tax status mapping",
    "olim.expect.item3": "Coordinated roadmap with defined next steps",
    "olim.cta.title": "Begin Your New Chapter with Confidence",
    "olim.cta.body": "We understand that relocating to Israel is more than a legal process. It is a life decision. Let us help you make it with clarity, structure, and peace of mind. Inquiries welcome in English and Hebrew.",
    "olim.cta.button": "Plan Your Arrival",
    "commercial.hero.title": "Commercial and Civil",
    "commercial.hero.subtitle": "Protecting business interests through disciplined contracts, structured risk allocation, and Israel based representation for cross border matters.",
    "commercial.philosophy.title": "Precision Before Disputes",
    "commercial.philosophy.body": "In commercial engagements, the strength of your position depends on the quality of your contracts. Whether drafting a shareholders' agreement, negotiating an exit, or structuring a cross border arrangement, we evaluate each matter through three lenses. Contractual rights, financial exposure, and future enforceability.",
    "commercial.philosophy.body2": "This approach reflects our core discipline. Legal analysis that is informed by financial understanding. Clients receive structured guidance that supports negotiation, dispute resolution, or formal proceedings, depending on what the matter requires.",
    "commercial.services.title": "Core Services",
    "commercial.services.contracts.title": "Contract Drafting and Review",
    "commercial.services.contracts.desc": "Structuring shareholders' agreements, partnership agreements, commercial leases, service contracts, and other commercial instruments with precise definitions, clear allocation of risk, and enforceable remedies.",
    "commercial.services.negotiation.title": "Negotiation and Risk Positioning",
    "commercial.services.negotiation.desc": "Strategic legal counsel before signature or during escalation to improve the client's leverage, manage exposure, and define acceptable outcomes.",
    "commercial.services.dispute.title": "Dispute Strategy and Resolution",
    "commercial.services.dispute.desc": "Pre litigation analysis, settlement frameworks, and litigation management where required. Our approach prioritizes the client's commercial interest, whether that calls for determined enforcement or a negotiated resolution.",
    "commercial.services.crossborder.title": "Cross Border Documentation",
    "commercial.services.crossborder.desc": "Coordination with overseas counsel and localization of foreign contracts and judgments for enforcement or recognition in Israel.",
    "commercial.crossborder.title": "Business Interests Across Borders",
    "commercial.crossborder.body": "We serve as the local legal representative for clients who reside abroad but maintain active commercial or financial interests in Israel. This includes investors, business owners, and executives who require ongoing Israeli counsel or need to protect specific rights and obligations within the Israeli legal system.",
    "commercial.crossborder.body2": "Whether enforcing a foreign contract in Israel, protecting shareholder rights while overseas, or managing a commercial dispute with an Israeli counterpart, we provide practical, on the ground representation. The practice coordinates Israeli legal requirements with foreign counsel and cross border strategy, ensuring that the client's position is consistent and enforceable across jurisdictions.",
    "commercial.clients.title": "Who We Work With",
    "commercial.clients.body": "The commercial practice serves business owners, investors, executives, and private clients who require disciplined legal counsel on contracts, asset protection, and complex disputes. Whether the engagement is a single transaction or an ongoing advisory relationship, we provide the same level of analytical depth and personal attention.",
    "commercial.cta.title": "Protect Your Commercial Position",
    "commercial.cta.body": "Begin with a contract review, a risk assessment, or a dispute strategy consultation. Confidential and documented. Inquiries welcome in English and Hebrew.",
    "commercial.cta.button": "Schedule a Consultation"
  },
  "privacy": {
    "title": "1. Introduction",
    "lastUpdated": "Last Updated March 2026",
    "sections": [
      {
        "title": "1. Introduction",
        "content": "Maya Ziv Law (\"we\", \"us\", or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
      },
      {
        "title": "2. Information We Collect",
        "content": "We may collect personal information that you voluntarily provide to us when you contact us through our website, including full name, email address, phone number, and any other information you choose to provide in your message. We collect this information only with your explicit consent."
      },
      {
        "title": "3. How We Use Your Information",
        "content": "We use the information we collect to respond to your inquiries and provide legal services, communicate with you about our services, comply with legal obligations, and protect our legal rights. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law."
      },
      {
        "title": "4. Data Security",
        "content": "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure."
      },
      {
        "title": "5. Your Rights Under Israeli Law (Amendment 13)",
        "content": "In accordance with Amendment 13 to the Privacy Protection Law, 5741-1981, you have the right to access your personal data held by us, request correction of inaccurate data, request deletion of your data, withdraw your consent at any time, and lodge a complaint with the Privacy Protection Authority. To exercise these rights, please contact us at info@mayaziv-law.com."
      },
      {
        "title": "6. Cookies",
        "content": "Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but this may limit some features of our website."
      },
      {
        "title": "7. Third Party Links",
        "content": "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies."
      },
      {
        "title": "8. Changes to This Policy",
        "content": "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date."
      },
      {
        "title": "9. Contact Us",
        "content": "If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at info@mayaziv-law.com or +972.544943597."
      }
    ]
  },
  "terms": {
    "title": "1. Acceptance of Terms",
    "lastUpdated": "Last Updated March 2026",
    "sections": [
      {
        "title": "1. Acceptance of Terms",
        "content": "By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website."
      },
      {
        "title": "2. Informational Purposes Only",
        "content": "The information provided on this website is for general informational purposes only. It does not constitute legal advice and should not be relied upon as such. The use of this website does not create an attorney-client relationship between you and Maya Ziv Law."
      },
      {
        "title": "3. No Attorney-Client Relationship",
        "content": "Viewing this website, submitting a contact form, or sending an email does not create an attorney-client relationship. Such a relationship is only established through a formal written engagement agreement signed by both parties."
      },
      {
        "title": "4. Confidentiality",
        "content": "Information submitted through this website is not guaranteed to be confidential. Please do not send sensitive or confidential information until an attorney-client relationship has been formally established."
      },
      {
        "title": "5. Intellectual Property",
        "content": "All content on this website, including text, graphics, logos, and images, is the property of Maya Ziv Law and is protected by Israeli and international copyright laws. Unauthorized use of this content is prohibited."
      },
      {
        "title": "6. Limitation of Liability",
        "content": "Maya Ziv Law shall not be liable for any damages arising from your use of this website or any information contained herein. This includes direct, indirect, incidental, punitive, and consequential damages."
      },
      {
        "title": "7. Links to Third Party Websites",
        "content": "This website may contain links to third party websites. We have no control over the content of these sites and are not responsible for their content or practices."
      },
      {
        "title": "8. Governing Law",
        "content": "These Terms of Service shall be governed by and construed in accordance with the laws of the State of Israel. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Israel."
      },
      {
        "title": "9. Changes to Terms",
        "content": "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website constitutes acceptance of the modified terms."
      },
      {
        "title": "10. Contact Information",
        "content": "For questions about these Terms of Service, please contact us at info@mayaziv-law.com or +972.544943597."
      }
    ]
  }
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatch(texts, retries = 4) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(DEEPL_URL, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: texts,
          source_lang: 'EN',
          target_lang: 'HE',
        }),
      });

      if (res.status === 429 || res.status >= 500) {
        const wait = (attempt + 1) * 3000;
        console.warn('  Rate limited, retrying in ' + (wait/1000) + 's...');
        await sleep(wait);
        continue;
      }

      if (!res.ok) {
        const body = await res.text();
        throw new Error('DeepL error ' + res.status + ': ' + body);
      }

      const data = await res.json();
      return data.translations.map(t => t.text);
    } catch (err) {
      if (attempt < retries - 1) {
        console.warn('  Network error, retrying...', err.message);
        await sleep(2000);
        continue;
      }
      throw err;
    }
  }
  throw new Error('Exceeded retry limit');
}

async function translateAll(strings, batchSize = 40) {
  const results = [];
  for (let i = 0; i < strings.length; i += batchSize) {
    const batch = strings.slice(i, i + batchSize);
    const from = i + 1;
    const to = Math.min(i + batchSize, strings.length);
    console.log('  Translating ' + from + '-' + to + ' of ' + strings.length + '...');
    const translated = await translateBatch(batch);
    results.push(...translated);
    if (i + batchSize < strings.length) await sleep(600);
  }
  return results;
}

async function main() {
  console.log('Maya Ziv Law — DeepL Hebrew Translation');
  console.log('========================================');
  
  const contextKeys = Object.keys(englishData.context);
  const contextValues = Object.values(englishData.context);
  
  // Collect non-empty strings
  const nonEmptyMap = [];
  const toTranslate = [];
  
  contextValues.forEach((v, i) => {
    if (v.trim()) {
      nonEmptyMap.push({ type: 'context', index: i });
      toTranslate.push(v);
    }
  });
  
  toTranslate.push(englishData.privacy.title);
  toTranslate.push(englishData.privacy.lastUpdated);
  for (const s of englishData.privacy.sections) {
    toTranslate.push(s.title);
    toTranslate.push(s.content);
  }
  
  toTranslate.push(englishData.terms.title);
  toTranslate.push(englishData.terms.lastUpdated);
  for (const s of englishData.terms.sections) {
    toTranslate.push(s.title);
    toTranslate.push(s.content);
  }
  
  console.log('Total strings: ' + toTranslate.length);
  console.log('');
  
  const translated = await translateAll(toTranslate);
  
  let idx = 0;
  
  // Rebuild context
  const contextHE = {};
  for (let i = 0; i < contextKeys.length; i++) {
    if (contextValues[i].trim()) {
      contextHE[contextKeys[i]] = translated[idx++];
    } else {
      contextHE[contextKeys[i]] = '';
    }
  }
  
  // Privacy
  const privacyHE = {
    title: translated[idx++],
    lastUpdated: translated[idx++],
    sections: englishData.privacy.sections.map(() => ({
      title: translated[idx++],
      content: translated[idx++],
    })),
  };
  
  // Terms
  const termsHE = {
    title: translated[idx++],
    lastUpdated: translated[idx++],
    sections: englishData.terms.sections.map(() => ({
      title: translated[idx++],
      content: translated[idx++],
    })),
  };
  
  const output = { context: contextHE, privacy: privacyHE, terms: termsHE };
  
  const fs = await import('fs');
  fs.writeFileSync('translations_output.json', JSON.stringify(output, null, 2));
  console.log('');
  console.log('Done! File saved: translations_output.json');
  console.log('Share this file back in the chat.');
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
