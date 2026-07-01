export type GlossaryTerm = {
  slug: string;
  term: string;
  category:
    | "Direct Debit"
    | "Open Banking"
    | "Settlement"
    | "Compliance"
    | "Payments"
    | "Disputes"
    | "Reconciliation"
    | "Infrastructure";
  definition: string;
  explanation: string;
  whyItMatters: string;
  relatedTerms: string[];
  resources?: { label: string; href: string }[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "account-number",
    term: "Account Number",
    category: "Infrastructure",
    definition:
      "An eight-digit number that identifies a specific bank account at a UK financial institution.",
    explanation:
      "Every UK current account has a unique eight-digit account number. Used together with a sort code, it pinpoints exactly which account to send money to or collect money from. When you set up a Direct Debit mandate or receive a bank transfer, you provide both your sort code and your account number so the payment network can route funds correctly.\n\nFor businesses, account numbers matter most when setting up payment collection — either asking customers to provide theirs for Direct Debit or providing your own so customers can pay you by bank transfer. Account numbers are not secret, but they should be handled carefully alongside sort codes, since the combination is sufficient to initiate certain payment instructions.",
    whyItMatters:
      "Incorrect account numbers are one of the most common causes of failed or misdirected payments, so verifying them at point of entry saves significant operational pain later.",
    relatedTerms: ["sort-code", "iban", "bank-transfer", "direct-debit-mandate"],
  },
  {
    slug: "advance-notice",
    term: "Advance Notice",
    category: "Direct Debit",
    definition:
      "The minimum number of days a business must notify its customers before collecting a Direct Debit payment.",
    explanation:
      "Under the Direct Debit Guarantee, businesses are required to give customers advance notice of any upcoming collection — including the amount and the date. The standard requirement is at least 10 working days, though this can be reduced by agreement with the customer (for example, some businesses specify 3 days' notice in their mandate paperwork).\n\nAdvance notice is typically given in writing — via email, letter, or an invoice — and must be sent before each collection unless a fixed schedule has already been agreed in the mandate. If you collect variable amounts (such as usage-based or subscription fees that change month to month), each new amount requires fresh notice.\n\nFailing to give adequate advance notice doesn't necessarily make the payment invalid, but it does expose the business to indemnity claims, as customers can dispute collections they weren't properly warned about. Good advance notice processes also reduce customer service queries and build trust in the payment relationship.",
    whyItMatters:
      "Giving clear advance notice reduces disputes, protects you from indemnity claims, and gives customers confidence that their Direct Debits are being managed responsibly.",
    relatedTerms: ["direct-debit-mandate", "direct-debit", "indemnity-claim", "recurring-payment"],
  },
  {
    slug: "ais",
    term: "Account Information Service (AIS)",
    category: "Open Banking",
    definition:
      "A regulated service that allows third-party providers to securely access a customer's bank account data — with their consent — to display balances, transactions, and financial insights.",
    explanation:
      "Account Information Services are one of the two main pillars of open banking alongside Payment Initiation Services. An AIS provider connects to a customer's bank account via a regulated API, pulling read-only data such as account balances, transaction history, and categorised spending.\n\nThe customer must explicitly consent to each AIS connection, and consent can be revoked at any time. AIS providers must be authorised by the Financial Conduct Authority (FCA) in the UK, and data can only be accessed for the purpose the customer agreed to.\n\nFor businesses, AIS is useful for a wide range of applications: verifying that a customer's account can support a direct debit before collection; pre-filling onboarding forms with account details; monitoring cash flow across multiple business accounts in one dashboard; and powering credit decisions based on real transaction data rather than credit scores.\n\nAIS is distinct from payment initiation — it can see and analyse data, but cannot move money.",
    whyItMatters:
      "AIS gives businesses a live, verified view of a customer's financial position, enabling smarter decisions on credit, collection timing, and onboarding without relying on outdated or self-reported information.",
    relatedTerms: ["open-banking", "pis", "psd2", "strong-customer-authentication"],
  },
  {
    slug: "aml",
    term: "Anti-Money Laundering (AML)",
    category: "Compliance",
    definition:
      "A set of laws, regulations, and procedures designed to prevent criminals from disguising illegally obtained funds as legitimate income.",
    explanation:
      "Anti-money laundering regulations apply to any business that handles, processes, or facilitates the movement of money — including payment service providers, banks, and many SMEs in certain sectors. In the UK, AML obligations are primarily governed by the Proceeds of Crime Act 2002 and the Money Laundering Regulations 2017.\n\nThe core requirements are: knowing who your customers are (through KYC and KYB checks), monitoring transactions for suspicious activity, and reporting concerns to the National Crime Agency via a Suspicious Activity Report (SAR).\n\nFor most businesses using a payment platform, many AML obligations are handled by the platform itself — the provider is regulated and carries out checks on your behalf. However, businesses in certain high-risk sectors (such as estate agents, accountants, or legal firms) may carry their own AML obligations under the Money Laundering Regulations.\n\nFailure to comply can result in significant fines, reputational damage, or criminal prosecution of senior individuals in the business.",
    whyItMatters:
      "Working with a regulated payment provider that takes AML seriously protects your business from being inadvertently used as a channel for financial crime.",
    relatedTerms: ["kyc", "kyb", "fraud", "psd2"],
  },
  {
    slug: "api",
    term: "API (Application Programming Interface)",
    category: "Infrastructure",
    definition:
      "A set of rules and protocols that allows software applications to communicate with each other and exchange data or trigger actions.",
    explanation:
      "An API is essentially a structured way for one piece of software to talk to another. In the payments world, APIs are what allow your accounting software to connect to your payment provider, or your website to trigger a payment collection automatically when a subscription renews.\n\nRather than logging into a dashboard manually to create each payment, an API lets your existing systems — your CRM, your billing software, your ERP — send instructions directly to your payment provider in real time. The payment provider processes the instruction and sends back a response confirming success, failure, or any relevant details.\n\nFor businesses, APIs are the difference between a payment tool that requires manual intervention and one that runs automatically in the background. If you process significant volumes of payments, an API integration means collections, reconciliation, and reporting can all happen without a human touching each transaction.\n\nAPIs also power things like webhooks, real-time notifications, and automated retry logic.",
    whyItMatters:
      "A well-designed payment API lets your business automate collections at scale, reducing manual work and the errors that come with it.",
    relatedTerms: ["webhook", "sandbox", "payment-processor", "payment-gateway"],
    resources: [{ label: "Praevor API documentation", href: "/developers" }],
  },
  {
    slug: "acquiring-bank",
    term: "Acquiring Bank",
    category: "Infrastructure",
    definition:
      "The bank or financial institution that processes card payments on behalf of a business and credits the funds to the merchant's account.",
    explanation:
      "When a customer pays by card, the acquiring bank is the institution on the merchant's side of the transaction. It receives the payment instruction from the card network (Visa or Mastercard), communicates with the customer's bank (the issuing bank), and ultimately settles the funds into the merchant's account.\n\nAcquiring banks are distinct from payment gateways and payment processors, though they often work together and some providers bundle all three functions. The acquirer takes on a degree of financial risk — if a merchant takes payment for goods and then goes out of business before delivering them, the acquirer may be liable for chargebacks.\n\nFor bank-to-bank payments like Direct Debit or open banking, the acquiring bank model doesn't apply in the same way, as there is no card network involved. Those payments move directly between the payer's bank and the payee's bank via schemes like Bacs or Faster Payments.",
    whyItMatters:
      "Understanding acquiring bank relationships helps you compare payment providers effectively and understand who bears risk in card payment disputes.",
    relatedTerms: ["issuing-bank", "payment-gateway", "payment-processor", "chargeback"],
  },
  {
    slug: "automated-reconciliation",
    term: "Automated Reconciliation",
    category: "Reconciliation",
    definition:
      "The use of software to automatically match incoming payment data against invoices, orders, or accounting entries without manual intervention.",
    explanation:
      "Reconciliation is the process of confirming that what your payment system shows as collected matches what's actually arrived in your bank account — and that it all ties back to the correct invoices or customer records. Traditionally, this was done manually: exporting reports, cross-referencing spreadsheets, and hunting for discrepancies.\n\nAutomated reconciliation replaces that with software that does the matching in real time. Payment data flows directly from your payment provider into your accounting system, where each transaction is matched against open invoices. Successful matches are marked as paid; exceptions — partial payments, unknown references, returns — are flagged for human review.\n\nThe result is that month-end close becomes faster and less error-prone. Finance teams spend time reviewing exceptions rather than processing every line. And because the reconciliation runs continuously rather than once a month, you always have an accurate picture of what's been collected and what remains outstanding.\n\nFor businesses collecting recurring payments at volume, automated reconciliation is almost essential — manually processing hundreds or thousands of payments is both slow and error-prone.",
    whyItMatters:
      "Automated reconciliation dramatically reduces month-end workload and gives you real-time visibility into collected revenue, which improves cash flow forecasting accuracy.",
    relatedTerms: [
      "reconciliation",
      "bank-reconciliation",
      "settlement",
      "payment-run",
    ],
    resources: [
      { label: "How Praevor handles reconciliation", href: "/products/reconciliation" },
    ],
  },
  {
    slug: "bacs",
    term: "Bacs",
    category: "Infrastructure",
    definition:
      "The UK payment scheme that processes Direct Debit and Bacs Direct Credit transactions, handling billions of pounds in payments each year.",
    explanation:
      "Bacs (Bankers' Automated Clearing Services) is the organisation and scheme behind two of the UK's most important payment types: Direct Debit and Bacs Direct Credit. It is one of the oldest electronic payment networks in the world, having processed its first transaction in 1968.\n\nThe Bacs scheme operates on a three-day processing cycle. When a payment instruction is submitted on Day 1, the funds move on Day 3. This predictable cycle is why so many UK businesses use Direct Debit for regular collections — you know exactly when funds will arrive.\n\nBacs processes an enormous volume of transactions: over 7 billion payments per year, including most UK salary payments (via Bacs Direct Credit) and the vast majority of regular bill collections (via Direct Debit). It is owned and operated by Pay.UK, the body responsible for most UK retail payment schemes.\n\nTo use Bacs directly, a business needs a Service User Number (SUN), which requires sponsorship from an approved bank or payment provider. Most SMEs access Bacs indirectly through a payment platform.",
    whyItMatters:
      "Bacs is the backbone of UK recurring payments — understanding how it works helps you plan collection timing, manage cash flow, and troubleshoot payment delays.",
    relatedTerms: [
      "direct-debit",
      "bacs-payment",
      "service-user-number",
      "settlement-period",
      "faster-payments",
    ],
  },
  {
    slug: "bacs-payment",
    term: "Bacs Payment",
    category: "Direct Debit",
    definition:
      "A payment processed through the Bacs scheme, either as a Direct Debit collection from a customer or a Bacs Direct Credit sent to a recipient.",
    explanation:
      "Bacs payments come in two forms. Bacs Direct Credit is used to send money — most commonly for salary payments, supplier payments, and government benefit payments. The paying organisation instructs Bacs to credit specific accounts, and the money arrives three working days later.\n\nBacs Direct Debit is used to collect money — the organisation receiving the funds (the biller) instructs Bacs to pull money from the customer's account on a specific date, provided a valid mandate exists.\n\nBoth types follow the same three-day cycle: submit on Day 1, process on Day 2, funds settle on Day 3. Weekends and bank holidays are excluded from this count, so a payment submitted on a Thursday arrives on the following Tuesday.\n\nFor SMEs, Bacs Direct Debit is the most relevant form — it's what powers most subscription businesses, utility bills, insurance premiums, and regular invoice collection. Bacs Direct Credit is typically used by businesses paying employees or making bulk supplier payments.",
    whyItMatters:
      "Knowing how Bacs payments work — and how long they take — allows you to plan collection dates that ensure funds arrive when you need them.",
    relatedTerms: ["bacs", "direct-debit", "settlement-period", "t-plus-3", "payment-run"],
  },
  {
    slug: "bank-reconciliation",
    term: "Bank Reconciliation",
    category: "Reconciliation",
    definition:
      "The process of comparing your internal accounting records against your bank statement to ensure every transaction is accounted for and the balances match.",
    explanation:
      "Bank reconciliation is a fundamental accounting control — the process of going through your bank statement line by line and confirming that each transaction appears correctly in your books. Any differences between the bank statement and your accounting records need to be investigated and resolved.\n\nCommon reconciliation differences include payments that have been entered in your books but haven't cleared the bank yet, bank charges that haven't been recorded in your accounts, returned payments that require reversal entries, and timing differences on large transfers.\n\nFor businesses collecting many payments — particularly via Direct Debit or open banking — bank reconciliation becomes complex. Returns, failures, and timing differences mean there are regularly entries on your bank statement that don't map neatly to what you expected. Without a structured reconciliation process, errors compound over time and month-end close becomes a significant effort.\n\nModern payment platforms help by providing reconciliation data alongside payment data — giving finance teams the information they need to match transactions quickly.",
    whyItMatters:
      "Regular bank reconciliation prevents accounting errors from accumulating, ensures your cash balance is accurate, and is typically required for a clean audit.",
    relatedTerms: ["reconciliation", "automated-reconciliation", "settlement", "failed-payment"],
  },
  {
    slug: "bank-transfer",
    term: "Bank Transfer",
    category: "Payments",
    definition:
      "A direct electronic movement of funds from one bank account to another, without the use of cards.",
    explanation:
      "A bank transfer is the most direct form of electronic payment — money moves from account A to account B through a payment network, using only the bank details of sender and recipient. In the UK, bank transfers typically travel via Faster Payments (arriving in seconds), CHAPS (same day, used for large transactions), or Bacs (three working days).\n\nBank transfers have no intermediary processing fees in the same way card payments do, which makes them popular for B2B payments, high-value transactions, and businesses looking to avoid card scheme costs.\n\nOpen banking has made bank transfers significantly more convenient for consumers too, by allowing payments to be initiated directly from a banking app through a Payment Initiation Service rather than requiring the payer to manually log in and enter payment details.\n\nFor businesses, offering bank transfer as a payment method — particularly via open banking payment links — can reduce the cost of collection compared to cards, while still offering a smooth customer experience.",
    whyItMatters:
      "Bank transfers are typically faster to settle and cheaper to process than card payments, making them attractive for businesses looking to improve cash flow and reduce payment costs.",
    relatedTerms: ["faster-payments", "chaps", "open-banking", "pis", "payment-link"],
  },
  {
    slug: "batch-payment",
    term: "Batch Payment",
    category: "Payments",
    definition:
      "A group of multiple individual payment instructions bundled together and submitted to a payment scheme as a single file or job.",
    explanation:
      "Rather than submitting each payment individually, batch processing allows businesses to group hundreds or thousands of payment instructions into a single submission. This is how most Direct Debit collections work — on collection day, a business's payment platform sends a batch file to Bacs containing instructions for every customer due to pay that day.\n\nBatch payments have historically been associated with end-of-day or overnight processing, where a business accumulates all the day's payment instructions and submits them together. This is efficient for high-volume, regular collections where individual real-time processing isn't necessary.\n\nThe trade-off with batch payments is timing — because they're submitted together, they move through the payment scheme together on the same cycle. This is predictable and reliable, but doesn't offer the immediacy of a real-time payment.\n\nFor SMEs with regular, recurring billing, batch Direct Debit collection is the standard approach. For one-off, urgent payments, Faster Payments or open banking is typically more appropriate.",
    whyItMatters:
      "Batch payments are the most efficient way to collect from many customers at once, reducing the operational complexity of running large payment volumes.",
    relatedTerms: ["bulk-payment", "payment-run", "direct-debit", "bacs", "payment-schedule"],
  },
  {
    slug: "bnpl",
    term: "Buy Now Pay Later (BNPL)",
    category: "Payments",
    definition:
      "A short-term financing arrangement that allows customers to receive goods or services immediately and pay for them in instalments over a set period.",
    explanation:
      "Buy Now Pay Later products allow consumers to split the cost of a purchase into multiple payments, typically spread over a few weeks or months — often interest-free if paid on time. The business receives payment immediately (or shortly after the purchase) from the BNPL provider, which then takes on the responsibility of collecting from the customer.\n\nFrom a merchant's perspective, BNPL is a payment method similar to a card — you integrate a BNPL option at checkout, the customer selects it, and you receive funds from the provider. The provider bears the credit risk. In return, merchants typically pay a higher processing fee than for standard card payments.\n\nBNPL has grown rapidly in B2C retail, particularly for fashion, electronics, and higher-value consumer goods. In the B2B space, similar concepts exist under names like trade credit or net terms — where a supplier extends payment terms to a business customer.\n\nIn the UK, BNPL regulation has been tightening, with the FCA moving to bring consumer BNPL products under the Consumer Credit Act.",
    whyItMatters:
      "Offering BNPL as a payment option can increase conversion rates and average order values, but businesses should understand the associated processing costs and regulatory landscape.",
    relatedTerms: ["payment-terms", "invoice", "recurring-payment", "subscription-billing"],
  },
  {
    slug: "bulk-payment",
    term: "Bulk Payment",
    category: "Payments",
    definition:
      "A large-scale payment run in which a business sends or collects funds from a high number of accounts simultaneously.",
    explanation:
      "Bulk payments are essentially batches at scale. The term is often used when a business is dealing with very high transaction volumes — payroll for thousands of employees, supplier payments across a large supply chain, or collections from tens of thousands of customers on the same date.\n\nThe mechanics are similar to batch payments: instructions are grouped and submitted together via a payment scheme like Bacs. What distinguishes bulk payments is primarily the scale and the systems required to manage them — a business running bulk payments needs robust data management, error handling, and reconciliation processes to deal with the inevitable failures and exceptions at volume.\n\nFor payment providers, supporting bulk payments requires infrastructure capable of processing and tracking large file submissions, handling partial failures without aborting the whole run, and providing clear reporting on outcomes for every individual transaction.\n\nBusinesses growing into bulk payment volumes often reach a point where manual management becomes impractical and automation becomes essential.",
    whyItMatters:
      "Bulk payment capability is essential for businesses that collect or distribute large numbers of payments simultaneously, and the reliability of that infrastructure directly affects cash flow.",
    relatedTerms: ["batch-payment", "payment-run", "payment-schedule", "bacs", "direct-debit"],
  },
  {
    slug: "cash-flow",
    term: "Cash Flow",
    category: "Payments",
    definition:
      "The movement of money into and out of a business over a given period, reflecting the timing difference between when money is earned and when it is received.",
    explanation:
      "Cash flow is one of the most important concepts in business finance, and it's distinct from profit. A business can be profitable on paper — with plenty of invoices raised and revenue recognised — while simultaneously struggling with cash flow if customers are slow to pay, payments fail, or collection timing doesn't align with when bills are due.\n\nFor businesses that collect payments regularly — whether weekly, monthly, or quarterly — cash flow management often centres on the reliability and timing of those collections. A failed Direct Debit doesn't just delay one payment; it disrupts the entire cash flow forecast for that period and creates a recovery process that absorbs staff time.\n\nGood payment infrastructure directly supports cash flow. Predictable collection dates, low failure rates, fast settlement, and accurate reconciliation all contribute to a business knowing where its cash is at any given moment — and being able to plan around it.\n\nFailed payments are one of the most common causes of unexpected cash flow gaps in subscription and recurring-billing businesses.",
    whyItMatters:
      "Reliable, predictable payment collection is one of the most direct levers a business has on its cash flow — delays and failures compound quickly at scale.",
    relatedTerms: [
      "failed-payment",
      "settlement-period",
      "working-capital",
      "days-sales-outstanding",
      "payment-failure-rate",
    ],
    resources: [
      { label: "Failed payment cost calculator", href: "/resources/failed-payment-calculator" },
    ],
  },
  {
    slug: "chaps",
    term: "CHAPS",
    category: "Infrastructure",
    definition:
      "The UK's same-day high-value payment scheme, used for large or time-critical transfers between bank accounts.",
    explanation:
      "CHAPS (Clearing House Automated Payment System) is the UK's same-day settlement payment scheme, operated by the Bank of England. Unlike Faster Payments, which has transaction limits and is primarily used for retail and SME payments, CHAPS is designed for large-value transactions — property purchases, large business transfers, and financial market settlements — where same-day certainty is essential.\n\nCHAPS payments are processed and settled individually, in real time during banking hours (typically 8am to 6pm on working days). There is no upper limit on the value of a CHAPS payment, which makes it the preferred method for property completions and other large transactions.\n\nThe cost is higher than Faster Payments — banks typically charge between £20 and £35 per CHAPS transaction — which means it's reserved for transactions where speed and certainty justify the fee. For routine business payments under the Faster Payments limit, that scheme is more cost-effective.\n\nFor most SMEs, CHAPS is encountered primarily when buying or selling commercial property or making very large one-off payments.",
    whyItMatters:
      "For high-value or time-sensitive transactions, CHAPS provides guaranteed same-day settlement — the certainty is worth the premium when the stakes are high.",
    relatedTerms: ["faster-payments", "bacs", "settlement", "bank-transfer", "payment-rail"],
  },
  {
    slug: "chargeback",
    term: "Chargeback",
    category: "Disputes",
    definition:
      "A reversal of a card payment initiated by the cardholder's bank, returning funds to the customer after a disputed transaction.",
    explanation:
      "A chargeback occurs when a cardholder asks their bank to reverse a payment they believe was fraudulent, unauthorised, or related to goods or services not received as described. The bank investigates and, if it finds in favour of the customer, forcibly retrieves the funds from the merchant via the card network.\n\nChargebacks are distinct from refunds — a refund is issued voluntarily by the merchant, while a chargeback is initiated by the customer's bank. Chargebacks also carry a processing fee (typically £10–£25 per case) and can damage a merchant's relationship with their acquiring bank if the chargeback rate exceeds acceptable thresholds (usually around 1%).\n\nMerchants can dispute chargebacks by providing evidence — proof of delivery, signed contracts, correspondence with the customer — but the process is time-consuming and the outcome is often uncertain.\n\nChargebacks are a card-specific mechanism. Bank-to-bank payments via Direct Debit have a different protection mechanism called the Direct Debit Guarantee and indemnity claims, which work differently.",
    whyItMatters:
      "High chargeback rates damage merchant accounts and can result in loss of card processing capability — proactive dispute management and clear evidence records are essential for businesses at scale.",
    relatedTerms: ["dispute", "refund", "indemnity-claim", "fraud", "acquiring-bank"],
  },
  {
    slug: "days-sales-outstanding",
    term: "Days Sales Outstanding (DSO)",
    category: "Payments",
    definition:
      "A measure of how many days, on average, it takes a business to collect payment after an invoice has been raised.",
    explanation:
      "Days Sales Outstanding is calculated by dividing your accounts receivable balance by your average daily revenue. A DSO of 30 means, on average, it takes 30 days from invoicing a customer to receiving payment — which may or may not align with your stated payment terms.\n\nDSO is a useful indicator of the health of your receivables. A rising DSO suggests customers are taking longer to pay, which may indicate cash flow pressure on their end, weaknesses in your collections process, or both. A low DSO suggests efficient collection.\n\nFor businesses using automated Direct Debit collection, DSO tends to be very low — payments are collected on a fixed date, predictably. For businesses relying on invoice payment terms (net 30, net 60), DSO can vary significantly based on customer behaviour and how actively outstanding invoices are chased.\n\nImproving DSO — by shortening payment terms, offering Direct Debit, or automating payment reminders — directly improves cash flow and reduces the working capital required to run the business.",
    whyItMatters:
      "A lower DSO means faster access to earned revenue, which reduces the working capital tied up in outstanding receivables and gives you more financial flexibility.",
    relatedTerms: ["working-capital", "cash-flow", "payment-terms", "invoice", "recurring-payment"],
  },
  {
    slug: "direct-debit",
    term: "Direct Debit",
    category: "Direct Debit",
    definition:
      "A payment method that allows a business to automatically collect money from a customer's bank account on agreed dates, with the customer's advance authorisation.",
    explanation:
      "Direct Debit is the dominant UK method for collecting regular payments — used for everything from gym memberships and insurance premiums to SaaS subscriptions and professional services retainers. The key distinction from other payment methods is that the business initiates the payment, rather than the customer actively making a transfer each time.\n\nTo set up a Direct Debit, the customer signs a mandate authorising the business to collect from their account. Once the mandate is in place, the business can collect on agreed dates by submitting instructions to the Bacs scheme. The customer is always protected by the Direct Debit Guarantee, which means they can get an immediate refund from their bank for any amount collected in error.\n\nFor businesses, Direct Debit offers predictability — you know when funds will arrive — and reduces the friction of chasing customers to pay. For customers, it removes the need to remember to pay each month.\n\nDirect Debit settlement takes three working days via the Bacs scheme, so it's not instant — but for regular billing, the predictability of a known collection and settlement date is often more valuable than immediacy.",
    whyItMatters:
      "Direct Debit is the most reliable and cost-effective way to collect regular payments from UK customers, offering predictable cash flow and low failure rates compared to card-based alternatives.",
    relatedTerms: [
      "bacs",
      "direct-debit-mandate",
      "advance-notice",
      "indemnity-claim",
      "service-user-number",
    ],
    resources: [
      { label: "Set up Direct Debit with Praevor", href: "/products/direct-debit" },
      { label: "Failed payment cost calculator", href: "/resources/failed-payment-calculator" },
    ],
  },
  {
    slug: "direct-debit-mandate",
    term: "Direct Debit Mandate",
    category: "Direct Debit",
    definition:
      "The formal authorisation a customer gives to allow a business to collect Direct Debit payments from their bank account.",
    explanation:
      "A Direct Debit mandate — sometimes called an instruction — is the legal agreement between a customer and the business collecting payments. It authorises the business (acting through its bank or a payment provider) to pull specified amounts from the customer's account on agreed dates.\n\nThe mandate captures: the customer's bank details (sort code and account number), the business's Service User Number, and an agreement to the Direct Debit Guarantee terms. Mandates can be set up on paper, over the phone, or digitally — the latter, known as a Paperless Direct Debit, has become the norm for most digital businesses.\n\nOnce set up, a mandate remains active until it is cancelled — either by the customer (via their bank or the business) or by the business itself. A mandate doesn't expire on its own, though it may be marked as dormant if no payment has been collected for a long period.\n\nBusinesses must notify customers before the first collection and before any changes in amount or collection date. If a mandate is cancelled by mistake, it needs to be re-established from scratch with a new authorisation.",
    whyItMatters:
      "A valid, active mandate is the foundation of every Direct Debit collection — without it, any collection attempt will fail and could trigger an indemnity claim.",
    relatedTerms: [
      "direct-debit",
      "service-user-number",
      "advance-notice",
      "indemnity-claim",
      "recurring-payment",
    ],
  },
  {
    slug: "dispute",
    term: "Dispute",
    category: "Disputes",
    definition:
      "A formal challenge by a customer or their bank questioning the validity, amount, or authorisation of a payment that has already been collected.",
    explanation:
      "Payment disputes arise when a customer believes a payment was taken incorrectly — whether because they didn't authorise it, it was for the wrong amount, the goods or services weren't delivered, or they simply don't recognise the transaction.\n\nThe resolution process depends on the payment method. For card payments, the customer typically raises a chargeback through their bank, which initiates a formal dispute process through the card network. For Direct Debit, the customer is protected by the Direct Debit Guarantee and can request an indemnity claim for a refund from their bank.\n\nFor businesses, disputes are a cost even when resolved in your favour — they absorb staff time, can result in fees, and if they occur frequently, can damage your standing with payment providers. Building clear evidence records (signed contracts, delivery confirmations, communications) is the best defence.\n\nPreventative measures — clear advance notices, recognisable payment references, and easy access to support — are consistently more effective at reducing disputes than strong evidence in the resolution process.",
    whyItMatters:
      "Disputes are expensive even when you win — the best strategy is prevention through clear customer communication and watertight mandate management.",
    relatedTerms: ["chargeback", "indemnity-claim", "refund", "direct-debit", "fraud"],
  },
  {
    slug: "embedded-finance",
    term: "Embedded Finance",
    category: "Infrastructure",
    definition:
      "The integration of financial services — such as payments, lending, or insurance — directly into a non-financial product or platform.",
    explanation:
      "Embedded finance refers to the trend of financial services appearing seamlessly within products and platforms that aren't primarily financial. Instead of leaving a platform to complete a payment or apply for credit elsewhere, the user does it within the product they're already using.\n\nCommon examples include ride-hailing apps that process payments within the app without redirecting to a bank, e-commerce platforms offering instant financing at checkout, and accounting software that initiates payments directly without logging into a separate banking portal.\n\nFor software businesses and SaaS platforms, embedded finance presents an opportunity to deepen customer relationships and create new revenue streams by incorporating payment collection, lending, or insurance directly into their product. This is enabled by platforms like Praevor offering APIs and white-label infrastructure that other businesses can build on.\n\nThe business embedding the financial product doesn't typically need to be FCA regulated itself — they work with a regulated partner who manages the underlying infrastructure and compliance.",
    whyItMatters:
      "Embedded finance allows businesses to create more integrated, seamless experiences for their customers while opening up new revenue streams from financial services.",
    relatedTerms: ["api", "white-label", "open-banking", "payment-gateway", "webhook"],
  },
  {
    slug: "encryption",
    term: "Payment Encryption",
    category: "Infrastructure",
    definition:
      "The process of converting sensitive payment data into an unreadable format so it cannot be accessed or misused if intercepted.",
    explanation:
      "Payment encryption protects sensitive data — card numbers, bank account details, authentication credentials — by transforming it into an encoded format that can only be decoded by someone with the correct decryption key. Without encryption, data transmitted between a customer's browser and a payment server could be intercepted and read by anyone on the network.\n\nModern payment encryption operates at multiple layers: the network layer (using TLS/HTTPS to encrypt data in transit), the application layer (encrypting data at rest in databases), and the point of interaction (encrypting card data at the terminal or at point of entry on a payment form).\n\nFor businesses, the practical implication is that you should never collect or store raw card numbers or sensitive bank details yourself — always route sensitive payment data through a PCI-compliant provider whose systems are built for exactly this purpose. Doing so dramatically reduces your compliance burden and exposure.\n\nEncryption is closely related to tokenisation — together they ensure that sensitive data is never exposed in a form that could be useful to an attacker.",
    whyItMatters:
      "Using a properly encrypted payment infrastructure protects your customers' data and shields your business from the regulatory and reputational consequences of a breach.",
    relatedTerms: ["tokenisation", "pci-dss", "payment-gateway", "strong-customer-authentication"],
  },
  {
    slug: "failed-payment",
    term: "Failed Payment",
    category: "Payments",
    definition:
      "A payment instruction that is not successfully completed, resulting in funds not being transferred from the payer to the payee.",
    explanation:
      "A failed payment occurs when a payment instruction is submitted but cannot be completed. For Direct Debit, this typically happens because the customer has insufficient funds, their account has been closed or switched, the mandate has been cancelled, or the bank has flagged the instruction for other reasons. For card payments, failures include expired cards, insufficient credit, and fraud blocks.\n\nFailed payments have a ripple effect beyond the immediate revenue gap. They trigger a return code that identifies the reason for failure, which the collecting business must investigate. Someone then needs to decide whether to retry, contact the customer, or write off the debt. Each step takes time and money.\n\nIndustry data suggests UK businesses recover roughly 65% of failed Direct Debits through retries and follow-up, but the 35% that remain unrecovered represent a direct loss. The administrative cost of managing failures — staff time, retry fees, communication — often exceeds the unrecovered amounts for businesses with small average payment sizes.\n\nPayment providers that offer predictive failure detection — flagging at-risk payments before collection day — can help businesses reduce failure rates significantly.",
    whyItMatters:
      "Unmanaged failed payments compound into significant revenue leakage and operational overhead — understanding your failure rate and having a clear recovery process is essential for any business collecting recurring payments.",
    relatedTerms: [
      "payment-retry",
      "return-code",
      "nsf",
      "payment-failure-rate",
      "indemnity-claim",
    ],
    resources: [
      { label: "Failed payment cost calculator", href: "/resources/failed-payment-calculator" },
    ],
  },
  {
    slug: "faster-payments",
    term: "Faster Payments",
    category: "Infrastructure",
    definition:
      "The UK payment scheme that processes bank transfers in near real time, with funds typically arriving within seconds.",
    explanation:
      "Faster Payments (formally the Faster Payments Service, or FPS) was launched in 2008 and transformed UK bank transfers from a multi-day process into something nearly instant. The scheme processes payments 24 hours a day, 7 days a week, 365 days a year — including bank holidays — and most transfers arrive within seconds, though the scheme allows up to 2 hours.\n\nFaster Payments handles a wide range of payment types: internet banking transfers, telephone banking payments, standing orders, and — increasingly — open banking payment initiations. The transaction limit is £1 million per payment, though individual banks may set lower limits for their customers.\n\nFor businesses, Faster Payments is particularly valuable for one-off or urgent payments where the three-day Bacs cycle is too slow. Open banking payment initiation services are built on top of Faster Payments, which is why open banking payments arrive quickly compared to Direct Debit.\n\nFaster Payments is operated by Pay.UK and accessed by businesses either directly through their bank or via a payment provider with Faster Payments connectivity.",
    whyItMatters:
      "Faster Payments enables near-instant settlement for bank transfers, making it the preferred infrastructure for open banking payments and time-sensitive collections.",
    relatedTerms: ["open-banking", "pis", "bank-transfer", "chaps", "instant-settlement"],
  },
  {
    slug: "fraud",
    term: "Payment Fraud",
    category: "Compliance",
    definition:
      "Any deliberate deception that results in an unauthorised payment being made or funds being diverted to an unintended recipient.",
    explanation:
      "Payment fraud takes many forms. Authorised push payment (APP) fraud occurs when a legitimate account holder is tricked into sending money to a fraudster — via fake invoices, impersonation scams, or social engineering. Unauthorised fraud occurs when someone uses stolen card or bank details to make payments without the account holder's knowledge.\n\nFor businesses, fraud exposure comes from multiple directions: customers using stolen payment details to purchase goods, fraudsters impersonating suppliers and changing bank account details on incoming invoices (invoice redirection fraud), and internal fraud from employees with access to payment systems.\n\nPayment providers play a significant role in fraud prevention through transaction monitoring, velocity checks, and identity verification — but businesses also have responsibilities, particularly around supplier payment processes and internal controls.\n\nStrong Customer Authentication (SCA) and open banking's consent-based model have helped reduce certain types of fraud, but APP fraud in particular remains a major and growing problem in the UK, prompting the Payment Systems Regulator to introduce mandatory reimbursement requirements for banks in 2024.",
    whyItMatters:
      "Fraud can result in direct financial loss, regulatory scrutiny, and reputational damage — understanding the most likely vectors and implementing controls proactively is far cheaper than recovering from an incident.",
    relatedTerms: ["aml", "strong-customer-authentication", "kyc", "chargeback", "psd2"],
  },
  {
    slug: "iban",
    term: "IBAN",
    category: "Infrastructure",
    definition:
      "An International Bank Account Number — a standardised format for identifying a bank account across international payment systems.",
    explanation:
      "IBAN (International Bank Account Number) is a globally recognised format for bank account identification, making it easier for payment systems in different countries to route funds to the correct account. A UK IBAN begins with 'GB', followed by two check digits and then a combination of sort code and account number — in total 22 characters.\n\nFor UK domestic payments (Bacs, Faster Payments), sort code and account number are sufficient and IBANs are rarely used. IBANs become important for international transfers — particularly within the SEPA zone — where they provide a standardised way to identify accounts across different national banking systems.\n\nIf you're collecting payments from customers in the EU via SEPA Direct Debit, they will need to provide their IBAN rather than a national sort code and account number equivalent. Similarly, if you're receiving payments from abroad, providing your IBAN and BIC helps ensure the funds route correctly.\n\nAll UK bank accounts can be expressed as an IBAN — your bank can generate yours on request or it can be derived from your sort code and account number using a standard formula.",
    whyItMatters:
      "If your business collects payments from or makes payments to accounts outside the UK, IBANs are the standard routing format and essential for avoiding misdirected or rejected international transfers.",
    relatedTerms: ["sort-code", "account-number", "sepa", "sepa-direct-debit", "bank-transfer"],
  },
  {
    slug: "indemnity-claim",
    term: "Indemnity Claim",
    category: "Disputes",
    definition:
      "A customer's right under the Direct Debit Guarantee to receive an immediate refund from their bank for any Direct Debit they believe was taken in error.",
    explanation:
      "The Direct Debit Guarantee is one of the strongest consumer protections in UK retail banking, and the indemnity claim is its core mechanism. Under this guarantee, if a customer believes a Direct Debit was taken incorrectly — wrong amount, wrong date, no valid mandate — they can walk into any branch or call their bank and receive an immediate, unconditional refund.\n\nThe bank then reclaims that money from the service user (the collecting business) via the Bacs scheme. The business has no right to refuse this claim initially — the bank simply debits the returned funds from the business's account. Only after the fact can a business challenge an indemnity claim it believes is unjustified, which requires going through a formal dispute process.\n\nFor businesses, indemnity claims represent both a financial risk (the funds are removed without warning) and a compliance flag (too many claims can trigger scrutiny from your bank or the Bacs scheme). The best protection is meticulous mandate management, clear advance notices, and easy customer access to cancel or amend their Direct Debit.",
    whyItMatters:
      "Indemnity claims can arrive without warning and immediately remove funds from your account — robust mandate records and good customer communication are your best protection.",
    relatedTerms: ["direct-debit", "direct-debit-mandate", "advance-notice", "dispute", "refund"],
  },
  {
    slug: "instant-settlement",
    term: "Instant Settlement",
    category: "Settlement",
    definition:
      "A settlement arrangement in which funds are transferred to the business's account immediately or within minutes of a payment being completed.",
    explanation:
      "Traditional payment settlement involves a delay between when a payment is made and when the funds arrive in the business's account. For Direct Debit via Bacs, this is three working days. For card payments via most acquirers, it's typically one to three days. Instant settlement eliminates or dramatically reduces that gap.\n\nIn the UK, instant settlement is most readily available for open banking payments made via Faster Payments — because the underlying scheme operates in real time, funds can arrive in the business's account within seconds of the customer authorising the payment.\n\nFor card payments, some acquiring banks and payment providers offer faster or same-day funding, though this often comes with a higher fee. True instant settlement for card payments requires infrastructure that can advance funds before the card scheme has completed its own settlement cycle.\n\nFor businesses with tight cash flow requirements — particularly in sectors with high-value individual transactions or unpredictable payment timing — instant settlement can significantly reduce working capital needs.",
    whyItMatters:
      "Instant settlement means funds are available immediately, removing the cash flow gap between collection and availability that affects planning and liquidity.",
    relatedTerms: ["settlement", "settlement-period", "faster-payments", "t-plus-2", "cash-flow"],
    resources: [
      { label: "Settlement calculator", href: "/resources/settlement-calculator" },
    ],
  },
  {
    slug: "interchange-fee",
    term: "Interchange Fee",
    category: "Infrastructure",
    definition:
      "A fee paid by the merchant's bank (the acquirer) to the cardholder's bank (the issuer) every time a card payment is processed.",
    explanation:
      "When you accept a card payment, a slice of the transaction value is paid by your acquiring bank to the customer's issuing bank. This is the interchange fee — it compensates the issuing bank for the risk it takes (covering potential chargebacks and fraud) and the cost of maintaining the customer's account and card.\n\nInterchange fees are set by the card schemes (Visa and Mastercard) and vary based on card type, transaction type, and merchant category. Consumer debit cards in the EU and UK carry capped interchange fees (0.2% for debit, 0.3% for credit), which helped reduce merchant costs when the regulation was introduced. Business cards and international cards typically carry higher interchange rates.\n\nYou don't pay interchange directly — it's bundled into the processing fee your payment provider charges you. Understanding interchange helps you decode your payment provider's pricing structure, particularly if you're on an interchange-plus pricing model where the interchange component is shown separately.\n\nBank-to-bank payments (Direct Debit, Faster Payments, SEPA) have no interchange component, which is one reason they're cheaper per transaction than card payments.",
    whyItMatters:
      "Interchange fees are a significant component of card payment costs — businesses processing high card volumes should understand their exposure and consider bank-to-bank alternatives where appropriate.",
    relatedTerms: [
      "acquiring-bank",
      "issuing-bank",
      "merchant-category-code",
      "payment-processor",
      "chargeback",
    ],
  },
  {
    slug: "invoice",
    term: "Invoice",
    category: "Payments",
    definition:
      "A formal document issued by a business to a customer requesting payment for goods or services delivered, specifying the amount due and payment terms.",
    explanation:
      "An invoice is the formal record of a commercial transaction — it tells the customer what they owe, for what, and by when. For most B2B businesses, invoices are the primary mechanism for requesting payment, and the management of outstanding invoices is a significant part of the accounts receivable function.\n\nInvoices typically include: invoice number, issue date, due date, description of goods or services, amount payable (with and without VAT), and payment instructions (bank details for transfer, or a payment link). In the UK, VAT-registered businesses must issue VAT invoices for all B2B transactions.\n\nThe gap between issuing an invoice and receiving payment is where cash flow challenges arise. A customer on 30-day payment terms might not pay until day 45 or 60, compounding across many customers into a significant accounts receivable balance.\n\nDirect Debit and open banking payment collection help by removing the passive element of invoice payment — instead of waiting for a customer to choose to pay, the business collects on the due date automatically, providing the mandate is in place.",
    whyItMatters:
      "An invoice is a legal document as well as a payment request — maintaining clear records and following up promptly on overdue invoices protects your cash flow and supports dispute resolution.",
    relatedTerms: ["payment-terms", "days-sales-outstanding", "cash-flow", "bank-transfer", "recurring-payment"],
  },
  {
    slug: "issuing-bank",
    term: "Issuing Bank",
    category: "Infrastructure",
    definition:
      "The bank or financial institution that provides a customer with their credit or debit card and is responsible for authorising card transactions.",
    explanation:
      "When a customer makes a card payment, two banks are involved: the acquiring bank (on the merchant's side) and the issuing bank (on the customer's side). The issuing bank is the one that issued the customer their card, maintains their account, and decides in real time whether to approve or decline a transaction.\n\nThe authorisation decision happens in milliseconds — the issuing bank checks whether the account has sufficient funds or credit, whether the transaction fits the card's normal patterns, and whether any fraud signals are present. If any of these checks fail, the transaction is declined.\n\nIssuing banks also bear the initial cost of card fraud — if a customer successfully disputes an unauthorised transaction, the issuing bank refunds them and then pursues the acquiring bank through the chargeback process.\n\nFor bank-to-bank payments (Direct Debit, Faster Payments), there's no issuing bank in the same sense — the payer's bank is simply the account-holding institution.",
    whyItMatters:
      "Understanding the issuing bank's role helps explain why card payment declines happen and why different card types carry different acceptance rates and costs.",
    relatedTerms: ["acquiring-bank", "chargeback", "payment-processor", "interchange-fee", "fraud"],
  },
  {
    slug: "kyb",
    term: "Know Your Business (KYB)",
    category: "Compliance",
    definition:
      "The process of verifying a business's identity, ownership structure, and legitimacy before providing it with financial services.",
    explanation:
      "Know Your Business checks are the business equivalent of Know Your Customer checks. Where KYC verifies the identity of an individual, KYB verifies the identity of a company — including its legal status, directors, ultimate beneficial owners (the people who own or control it), and the nature of its business activities.\n\nPayment providers, banks, and other financial services businesses are required by anti-money laundering regulations to conduct KYB checks before onboarding business customers. The depth of the check varies with the risk profile of the business — a high-risk sector or high-value transaction profile will require more thorough verification.\n\nFor SMEs applying for payment services, KYB is typically experienced as an onboarding process: providing company registration details, identifying directors, uploading documentation, and confirming the nature of the business and its expected transaction volumes.\n\nUltimate Beneficial Owner (UBO) checks — identifying individuals who own more than 25% of the company — are a key part of KYB and help prevent shell companies being used to disguise the true ownership of funds.",
    whyItMatters:
      "KYB is a regulatory requirement for financial services providers, and businesses should be prepared to provide accurate and complete information to avoid delays in onboarding.",
    relatedTerms: ["kyc", "aml", "fraud", "psd2"],
  },
  {
    slug: "kyc",
    term: "Know Your Customer (KYC)",
    category: "Compliance",
    definition:
      "The process of verifying the identity of an individual customer before providing them with financial services or processing payments on their behalf.",
    explanation:
      "Know Your Customer is a cornerstone of financial regulation. Banks, payment providers, and other regulated financial firms are required to verify who their customers are before establishing a relationship. This typically means verifying government-issued identity documents, checking addresses, and screening individuals against sanctions lists and politically exposed person (PEP) databases.\n\nKYC requirements scale with risk. Opening a basic bank account requires lighter-touch verification than setting up a merchant account or high-value payment facility. The concept of 'enhanced due diligence' applies when customers are in high-risk categories — certain jurisdictions, sectors, or transaction patterns that present greater money laundering risk.\n\nFor business owners, KYC is most commonly experienced as part of opening a bank account or onboarding with a payment provider. Increasingly, digital KYC allows verification through selfies and document uploads rather than in-person checks, reducing friction.\n\nKYC is distinct from KYB — KYC refers to verifying individuals, while KYB refers to verifying businesses. Both are typically required for business payment accounts.",
    whyItMatters:
      "KYC compliance protects businesses from regulatory risk and ensures payment providers can satisfy their own regulatory obligations — gaps in KYC processes can result in account suspension or closure.",
    relatedTerms: ["kyb", "aml", "fraud", "psd2", "strong-customer-authentication"],
  },
  {
    slug: "merchant-account",
    term: "Merchant Account",
    category: "Infrastructure",
    definition:
      "A type of bank account that allows a business to accept card payments, holding funds temporarily before they are transferred to the main business account.",
    explanation:
      "A merchant account is not the same as a regular business bank account. It is a holding account specifically for card payment proceeds — when a customer pays by card, the funds are first credited to the merchant account, where they are held during the settlement period. After the acquiring bank completes settlement (typically one to three business days), the funds are transferred to the business's main bank account.\n\nHistorically, obtaining a merchant account required a formal application to an acquiring bank, credit checks, and ongoing monthly fees. Modern payment providers like Stripe and Square introduced the concept of aggregated merchant accounts, where many businesses share an underlying merchant account managed by the provider — dramatically reducing the barrier to accepting card payments.\n\nFor businesses primarily using bank-to-bank payment methods (Direct Debit, open banking), a separate merchant account is not required — funds settle directly into the main business bank account.\n\nMerchant accounts carry contractual requirements around acceptable business types, transaction volumes, and chargeback rates.",
    whyItMatters:
      "Understanding how merchant accounts work explains the settlement delay on card payments and helps you evaluate the terms and costs of different card payment providers.",
    relatedTerms: ["acquiring-bank", "settlement", "payment-processor", "chargeback", "interchange-fee"],
  },
  {
    slug: "merchant-category-code",
    term: "Merchant Category Code (MCC)",
    category: "Infrastructure",
    definition:
      "A four-digit code assigned to every business that accepts card payments, classifying the type of products or services the business sells.",
    explanation:
      "Merchant Category Codes were developed by Visa and are used by all major card schemes to classify businesses. When you accept card payments, your acquiring bank assigns your business an MCC based on your primary activity — for example, 5411 for grocery stores, 7011 for hotels, or 7372 for software businesses.\n\nMCCs affect several things: interchange fee rates (some categories attract higher rates than others), card-scheme rules around what's permitted, whether a transaction appears as a suspicious category on fraud monitoring systems, and whether corporate cards restrict spending in certain categories.\n\nFor business travellers and expense management, MCCs are what allow company cards to be set up so they only work at certain types of merchants (petrol stations and restaurants, for example, but not cash advances).\n\nFor businesses accepting payments, being assigned the correct MCC matters for ensuring you're charged the right interchange rates. If your business has changed significantly since you first set up card acceptance, it's worth checking your MCC reflects your actual activity.",
    whyItMatters:
      "Your MCC affects the interchange fees you pay and the card-scheme rules that apply to your business — an incorrect MCC can mean overpaying on processing costs.",
    relatedTerms: ["interchange-fee", "acquiring-bank", "payment-processor", "payment-gateway"],
  },
  {
    slug: "nsf",
    term: "Non-Sufficient Funds (NSF)",
    category: "Payments",
    definition:
      "A return reason indicating that a payment instruction failed because the payer's account did not have enough money to cover the amount requested.",
    explanation:
      "Non-Sufficient Funds is one of the most common reasons a Direct Debit or bank payment fails. When a payment instruction is submitted, the payer's bank checks whether the account has sufficient available funds to cover the amount. If not, the payment is returned with an NSF (or 'insufficient funds') return code.\n\nThe timing of this check is important — a customer might have enough in their account at the start of the month when you submit the collection, but if other payments clear before yours, their balance may have fallen by the time Bacs processes the instruction. This is why collecting early in the month (or early on the collection day) can reduce NSF failures for some businesses.\n\nWhen an NSF failure occurs, the business must decide whether to retry the payment, contact the customer, or take other recovery action. Automated retry logic — submitting a second attempt a few days after the failure — recovers a meaningful proportion of NSF failures, since many are timing issues rather than fundamental inability to pay.\n\nFrequent NSF failures from a particular customer may signal cash flow difficulties that warrant a conversation rather than repeated retry attempts.",
    whyItMatters:
      "NSF is the most common failure reason for Direct Debit — having a clear retry strategy and customer communication workflow for NSF cases significantly improves recovery rates.",
    relatedTerms: ["failed-payment", "return-code", "payment-retry", "r-transaction", "direct-debit"],
    resources: [
      { label: "Failed payment cost calculator", href: "/resources/failed-payment-calculator" },
    ],
  },
  {
    slug: "one-off-payment",
    term: "One-Off Payment",
    category: "Payments",
    definition:
      "A single payment made or collected on a specific occasion, not part of a recurring schedule or subscription.",
    explanation:
      "A one-off payment is exactly what it sounds like — a single collection or transfer that stands alone rather than being part of a series. Examples include a deposit, an ad hoc invoice, a project fee collected at completion, or an additional charge outside a standard subscription.\n\nFor businesses primarily operating a subscription or recurring-billing model, one-off payments still arise regularly — onboarding fees, setup costs, variable usage charges, and ad hoc purchases all require the ability to collect a non-scheduled amount.\n\nOne-off payments can be collected in several ways: via an open banking payment link (where the customer authorises a specific one-off transfer), via Direct Debit against an existing mandate (using the variable or one-off collection facility), or via invoice and bank transfer.\n\nThe most appropriate method depends on the speed needed, the customer relationship, and whether an existing mandate is already in place. Open banking payment links are increasingly popular for one-off collections because they're instant, don't require a pre-existing mandate, and are lower cost than card payments.",
    whyItMatters:
      "Even subscription-first businesses regularly need to collect one-off amounts — having a flexible, frictionless method for this reduces the chance a customer delays or avoids a non-standard payment.",
    relatedTerms: ["recurring-payment", "payment-link", "open-banking", "direct-debit", "bank-transfer"],
    resources: [
      { label: "Collect one-off payments with Praevor", href: "/products/instant-bank-pay" },
    ],
  },
  {
    slug: "open-banking",
    term: "Open Banking",
    category: "Open Banking",
    definition:
      "A regulatory framework that requires banks to share customer account data with authorised third parties and allow those parties to initiate payments — with the customer's explicit consent.",
    explanation:
      "Open banking emerged from the EU's PSD2 regulation and the UK Competition and Markets Authority's Open Banking Initiative, which required the UK's nine largest banks to open their systems to third-party providers via standardised APIs. The result is a framework in which customers can consent to sharing their financial data or initiating payments through regulated third parties, without ever having to share their banking password.\n\nThere are two main open banking services: Account Information Services (AIS), which provide read access to account data, and Payment Initiation Services (PIS), which allow third parties to trigger bank transfers on behalf of the customer.\n\nFor businesses, open banking enables several things: collecting payments that arrive in near real time via Faster Payments; verifying customers' bank details and financial position during onboarding; and giving customers a frictionless payment experience that doesn't require manual bank transfers or card entry.\n\nOpen banking payments have no card scheme fees, settle quickly, and offer strong authentication by design — making them an attractive alternative to both card payments and traditional bank transfer for B2C and B2B contexts.",
    whyItMatters:
      "Open banking represents a genuine alternative to card payments for many use cases — lower cost, faster settlement, and a streamlined customer experience that doesn't rely on card infrastructure.",
    relatedTerms: ["pis", "ais", "psd2", "faster-payments", "strong-customer-authentication"],
    resources: [
      { label: "Open banking payments with Praevor", href: "/products/instant-bank-pay" },
    ],
  },
  {
    slug: "paper-audit-date",
    term: "Paper Audit Date (PAD)",
    category: "Direct Debit",
    definition:
      "The date by which a Direct Debit service user must retain physical or digital records of mandates and payment instructions to satisfy Bacs audit requirements.",
    explanation:
      "The Paper Audit Date, sometimes called the PAD, refers to the Bacs requirement for Direct Debit service users to retain adequate records of mandates, payment submissions, and customer correspondence. The Bacs rules require records to be kept for a minimum of 13 months from the date of the last transaction on a mandate.\n\nThis record-keeping obligation exists so that in the event of an indemnity claim or audit, the business can demonstrate that it had valid authorisation for each collection it made. Without these records, a business cannot defend against a claim that a payment was taken without proper authority.\n\nIn practice, this means keeping evidence of: the original mandate (signed form or electronic confirmation), all advance notices sent to customers, each payment submission made under the mandate, and any correspondence relating to changes or cancellations.\n\nMost modern payment platforms maintain these records automatically, but businesses using older or manual systems need to ensure their record-keeping meets this standard. A Bacs audit — which can happen if your service user number triggers compliance flags — will request this documentation.",
    whyItMatters:
      "Maintaining proper mandate records is a Bacs requirement — gaps in your audit trail can prevent you from defending indemnity claims and may result in suspension of your Direct Debit facility.",
    relatedTerms: ["direct-debit-mandate", "indemnity-claim", "service-user-number", "bacs", "advance-notice"],
  },
  {
    slug: "payment-failure-rate",
    term: "Payment Failure Rate",
    category: "Payments",
    definition:
      "The percentage of payment attempts that are returned or rejected, expressed as a proportion of total payment instructions submitted.",
    explanation:
      "Payment failure rate is a key operational metric for any business collecting recurring payments. It is calculated by dividing the number of failed payments in a period by the total number of payment attempts, then multiplying by 100 to get a percentage.\n\nIndustry benchmarks suggest typical UK Direct Debit failure rates of 2–5%, though this varies significantly by sector, average payment value, and customer demographics. Businesses collecting from consumer accounts tend to see higher failure rates than those collecting from business accounts, and higher-value collections tend to have higher failure rates than lower-value ones.\n\nA rising failure rate is an early warning signal. It may indicate that your customer base is experiencing financial pressure, that collection timing is poorly aligned with when customers' accounts are funded, or that mandate maintenance is slipping (resulting in failed collections on cancelled or changed accounts).\n\nReducing failure rate is typically more valuable than improving recovery rate — preventing a failure is faster and cheaper than recovering from one.",
    whyItMatters:
      "Even a small reduction in your failure rate compounds into significant revenue and operational savings at volume — tracking it monthly and investigating trends early pays dividends.",
    relatedTerms: ["failed-payment", "payment-retry", "nsf", "return-code", "cash-flow"],
    resources: [
      { label: "Failed payment cost calculator", href: "/resources/failed-payment-calculator" },
    ],
  },
  {
    slug: "payment-gateway",
    term: "Payment Gateway",
    category: "Infrastructure",
    definition:
      "The technology that securely transmits payment data from a customer's browser or app to the payment processor for authorisation.",
    explanation:
      "A payment gateway is the digital equivalent of a card terminal. When a customer enters their card details on a checkout page, the payment gateway securely captures that data, encrypts it, and forwards it to the payment processor for authorisation. It then receives the response (approved or declined) and communicates it back to the merchant and customer.\n\nPayment gateways handle the secure transmission of sensitive card data, which is why integrating a reputable gateway is essential for PCI DSS compliance — the gateway takes responsibility for the security of data in transit, so the merchant doesn't have to handle raw card numbers.\n\nModern payment gateways often bundle additional functionality: fraud screening, 3D Secure authentication, stored card tokens, and checkout UI components. Some payment providers combine gateway, processor, and acquirer functions in a single product.\n\nFor businesses using bank-to-bank payment methods — Direct Debit or open banking — a traditional payment gateway isn't required. The equivalent layer is the API connection between the business's systems and the payment provider.",
    whyItMatters:
      "The payment gateway is your customers' first point of contact with your payment infrastructure — reliability, speed, and a smooth checkout experience directly affect conversion rates.",
    relatedTerms: ["payment-processor", "acquiring-bank", "tokenisation", "pci-dss", "api"],
  },
  {
    slug: "payment-link",
    term: "Payment Link",
    category: "Open Banking",
    definition:
      "A URL or button that directs a customer to a payment page where they can authorise a transfer directly from their bank account.",
    explanation:
      "A payment link is a simple way to request a one-off payment from a customer without requiring them to have an account, enter card details, or set up a direct debit. The business generates a link (typically via their payment provider), shares it with the customer via email, SMS, or invoice, and the customer clicks through to a hosted payment page where they authorise the transfer.\n\nOpen banking payment links work particularly well for one-off collections — the customer is redirected to their banking app to approve the specific payment, which is then sent via Faster Payments and arrives in the business's account quickly. There are no card details to enter, no accounts to create, and no stored card data involved.\n\nPayment links are useful for small businesses invoicing clients, for collecting deposits, for follow-up payments after a failed Direct Debit, and for any situation where you need to collect a specific amount from a specific customer without a recurring arrangement.\n\nQR codes are a variant of payment links — encoding the same URL into a scannable image, which is useful for point-of-sale or paper-based contexts.",
    whyItMatters:
      "Payment links make it easy to collect one-off amounts from customers without complex integration — particularly useful for follow-up collections or ad hoc invoices.",
    relatedTerms: ["open-banking", "pis", "qr-code-payment", "one-off-payment", "bank-transfer"],
    resources: [
      { label: "Payment links with Praevor", href: "/products/instant-bank-pay" },
    ],
  },
  {
    slug: "payment-processor",
    term: "Payment Processor",
    category: "Infrastructure",
    definition:
      "A company that handles the technical transmission and routing of payment transactions between the merchant, the card networks, and the issuing and acquiring banks.",
    explanation:
      "A payment processor is the engine behind a card payment — it takes the authorisation request from the payment gateway, routes it through the relevant card network (Visa, Mastercard) to the issuing bank, receives the approval or decline decision, and sends it back. The processor also handles the settlement of funds from issuing bank to acquiring bank.\n\nThe distinction between gateway, processor, and acquirer is important but often blurred in practice — many payment providers bundle all three. The gateway handles the secure data capture; the processor handles the network routing and authorisation; the acquirer holds the merchant account and settles funds.\n\nFor bank-to-bank payments, there's no card network involved. The equivalent of a processor is the payment provider connecting to Bacs, Faster Payments, or other schemes — routing the payment instruction to the correct destination and handling the settlement.\n\nWhen comparing payment providers, understanding exactly which layer of the stack they provide — and which they rely on third parties for — helps you evaluate risk, pricing, and capability.",
    whyItMatters:
      "The reliability and capability of your payment processor directly determines your transaction success rates, settlement timing, and access to payment data.",
    relatedTerms: ["payment-gateway", "acquiring-bank", "issuing-bank", "interchange-fee", "api"],
  },
  {
    slug: "payment-rail",
    term: "Payment Rail",
    category: "Infrastructure",
    definition:
      "The underlying infrastructure or scheme that carries a payment from sender to recipient, such as Bacs, Faster Payments, CHAPS, or SEPA.",
    explanation:
      "A payment rail is the set of technical and operational standards, rules, and infrastructure that enables money to move from one bank account to another. Different payment rails have different characteristics — speed, cost, transaction limits, geographic reach, and the types of payment they support.\n\nIn the UK, the main payment rails are: Bacs (for Direct Debit and bulk credit transfers, 3-day cycle), Faster Payments (near real-time, used for most online bank transfers), CHAPS (same-day settlement, high-value), and the card networks Visa and Mastercard (which operate globally for card payments).\n\nFor international payments, rails include SEPA (in the EU), SWIFT (for most international wire transfers), and newer real-time payment systems being built in various countries.\n\nThe choice of payment rail affects almost every practical aspect of a payment — how quickly it arrives, whether it can be recalled if an error is made, what information can travel with the payment, and what it costs. Payment providers make the rail choice transparent to users, but understanding the rail helps explain why different payment types behave differently.",
    whyItMatters:
      "Different payment rails have very different characteristics — choosing the right one for your payment type directly affects cost, speed, and reliability.",
    relatedTerms: ["bacs", "faster-payments", "chaps", "sepa", "open-banking"],
  },
  {
    slug: "payment-retry",
    term: "Payment Retry",
    category: "Payments",
    definition:
      "A second (or subsequent) attempt to collect a payment after an initial attempt has failed.",
    explanation:
      "When a Direct Debit or other payment fails, the business has the option to retry — submitting a fresh collection instruction for the same amount from the same customer. Retries recover a meaningful proportion of failed payments, particularly those that failed due to timing issues (insufficient funds on the specific day, for example, where the customer's account is funded shortly after).\n\nRetry strategy matters. Retrying too quickly — the next day, for example — often just produces a second failure if the reason was insufficient funds. Waiting 3–7 days gives most customers time to receive income or transfer money. However, waiting too long reduces recovery rates as the customer may forget or the relationship may deteriorate.\n\nBacs has rules around the number of times a payment can be retried under the same mandate — businesses should be aware of these limits to avoid compliance issues. Over-retrying can also damage customer relationships and increase the risk of indemnity claims.\n\nAutomated retry logic — where the payment platform applies rules-based retry scheduling without manual intervention — is significantly more effective than manual retry management at volume.",
    whyItMatters:
      "A well-designed retry strategy can recover 20–40% of initially failed payments, turning a revenue loss into a timing delay and directly improving cash flow.",
    relatedTerms: ["failed-payment", "nsf", "return-code", "payment-failure-rate", "direct-debit"],
    resources: [
      { label: "Failed payment cost calculator", href: "/resources/failed-payment-calculator" },
    ],
  },
  {
    slug: "payment-run",
    term: "Payment Run",
    category: "Payments",
    definition:
      "A scheduled event in which a batch of payment instructions is prepared, reviewed, and submitted to a payment scheme for processing.",
    explanation:
      "A payment run is the operational process of collecting or disbursing payments in bulk on a specific date. For a subscription business, the monthly payment run is when all customers due for renewal that month are collected from simultaneously. For a business paying suppliers, a payment run might happen weekly — gathering all approved invoices and sending them as a batch.\n\nThe payment run process typically involves: pulling the list of payments due, verifying amounts and bank details, applying any last-minute changes or exclusions, submitting the batch to the payment provider or scheme, and receiving confirmation of submission.\n\nFor Direct Debit, the timing of the payment run is critical — submission must happen at least two working days before the intended collection date to allow for the Bacs processing cycle. Submitting late means the collection won't reach customers' accounts on the intended date.\n\nAutomation has made payment runs increasingly hands-off. Modern payment platforms can schedule runs automatically based on rules, send advance notices, submit to Bacs, and return results to the business's accounting system without manual intervention.",
    whyItMatters:
      "Running payment collections on schedule, with proper advance notice and submission timing, is the most basic requirement for maintaining predictable cash flow in a recurring-billing business.",
    relatedTerms: ["batch-payment", "bulk-payment", "payment-schedule", "bacs", "direct-debit"],
  },
  {
    slug: "payment-schedule",
    term: "Payment Schedule",
    category: "Payments",
    definition:
      "An agreed plan that sets out when payments will be collected or made, including dates, amounts, and frequency.",
    explanation:
      "A payment schedule is the plan underlying any recurring payment arrangement. For a subscription, it's the agreed collection frequency (monthly, quarterly, annually) and date (the 1st of the month, for example). For an invoice payment plan, it might be a series of specific amounts on specific dates spreading a larger sum over time.\n\nFor Direct Debit collections, the payment schedule must be communicated to the customer via advance notice before the first collection. If the schedule changes — different amount, different date — the customer must be notified again in advance.\n\nFrom a business operations perspective, payment schedules are the data that drives payment runs. Knowing exactly how many payments are due on each date, their amounts, and which customers they relate to is what allows accurate cash flow forecasting.\n\nFor customers, a clear payment schedule builds trust — they know when to expect money to leave their account, which helps them manage their own cash flow. Unclear or inconsistent schedules are a significant driver of disputes and indemnity claims.",
    whyItMatters:
      "A clear, consistently communicated payment schedule reduces disputes, supports cash flow planning, and is a regulatory requirement for Direct Debit under Bacs rules.",
    relatedTerms: ["recurring-payment", "payment-run", "advance-notice", "subscription-billing", "direct-debit-mandate"],
  },
  {
    slug: "payment-terms",
    term: "Payment Terms",
    category: "Payments",
    definition:
      "The conditions agreed between a business and its customers specifying when and how invoices must be paid.",
    explanation:
      "Payment terms define the rules of a commercial transaction: when payment is expected, what currency it should be in, whether early payment discounts are available, and what happens if payment is late. Common UK B2B payment terms include net 30 (payment due within 30 days of invoice date), net 60, and EOM (end of month after the month of invoice).\n\nFor UK businesses, the Prompt Payment Code sets expectations for larger businesses paying SME suppliers — with a target of paying within 30 days. Statutory interest can be charged on overdue invoices under the Late Payment of Commercial Debts Act.\n\nFor businesses offering standard invoice terms, the gap between raising an invoice and receiving payment directly affects Days Sales Outstanding and cash flow. Moving customers from manual invoice payment to Direct Debit effectively eliminates the variability in payment terms — collection happens on the agreed date regardless of whether the customer actively chooses to pay.\n\nPayment terms should be clearly stated on every invoice and, for new customers, agreed in writing before work begins.",
    whyItMatters:
      "Clear payment terms protect your cash flow rights legally, and moving customers onto Direct Debit is the most reliable way to ensure terms are actually adhered to.",
    relatedTerms: ["invoice", "days-sales-outstanding", "cash-flow", "direct-debit", "recurring-payment"],
  },
  {
    slug: "pci-dss",
    term: "PCI DSS",
    category: "Compliance",
    definition:
      "A set of security standards that any business handling card payment data must comply with, designed to protect cardholder information from theft and misuse.",
    explanation:
      "PCI DSS — the Payment Card Industry Data Security Standard — is a set of 12 requirements covering how businesses store, process, and transmit cardholder data. It is set by the PCI Security Standards Council, a body founded by Visa, Mastercard, American Express, Discover, and JCB.\n\nCompliance is not optional for businesses that accept card payments — it is required by card scheme rules and most merchant agreements. Non-compliance can result in fines, increased transaction fees, or loss of the ability to accept card payments.\n\nThe level of compliance required depends on how many transactions you process and how you handle card data. Most small businesses that use a reputable payment provider and never handle raw card numbers can complete a simple self-assessment questionnaire. Businesses that store card data or process very high volumes face more rigorous requirements including independent security audits.\n\nThe best way to minimise PCI compliance burden is to route all card data through a PCI-certified payment provider and use hosted payment fields or redirects so raw card numbers never touch your own servers.",
    whyItMatters:
      "PCI DSS compliance is legally required for card acceptance and a breach can result in significant fines and permanent damage to your ability to accept card payments.",
    relatedTerms: ["encryption", "tokenisation", "payment-gateway", "fraud", "strong-customer-authentication"],
  },
  {
    slug: "pis",
    term: "Payment Initiation Service (PIS)",
    category: "Open Banking",
    definition:
      "A regulated open banking service that allows a third party to trigger a bank transfer from a customer's account directly, with the customer's consent.",
    explanation:
      "Payment Initiation Services are one of the two main open banking categories (alongside Account Information Services). A PIS provider, authorised by the FCA, can connect to a customer's bank account and, with their explicit consent, instruct the bank to send a specific payment to a specified recipient.\n\nThe process from the customer's perspective is: they are directed to a payment page, they select their bank, they're redirected to their banking app or online banking, they authenticate (using their existing bank security), they approve the payment, and they're returned to the business's website. The payment then travels via Faster Payments and arrives in the business's account quickly.\n\nFor businesses, PIS offers several advantages over cards: no card scheme fees, faster settlement, no chargebacks (the customer authorised the specific payment so disputes work differently), and strong authentication by design.\n\nPIS is currently most suited to one-off or variable payments rather than recurring collections — the consent model requires the customer to actively approve each payment, which makes it less hands-off than Direct Debit for scheduled recurring amounts.",
    whyItMatters:
      "Payment Initiation Services offer a compelling alternative to cards for one-off payments — lower cost, faster settlement, and built-in strong authentication.",
    relatedTerms: ["open-banking", "ais", "faster-payments", "psd2", "payment-link"],
    resources: [
      { label: "Open banking payments with Praevor", href: "/products/instant-bank-pay" },
    ],
  },
  {
    slug: "psd2",
    term: "PSD2",
    category: "Compliance",
    definition:
      "The EU's Second Payment Services Directive — the regulation that underpins open banking, mandates Strong Customer Authentication, and governs payment services across Europe.",
    explanation:
      "PSD2 (Revised Payment Services Directive) came into force in January 2018 and transformed the regulatory landscape for payments across Europe. Its two most significant impacts were the mandate for banks to open their systems to third-party providers (giving birth to open banking) and the requirement for Strong Customer Authentication (SCA) on most electronic payments.\n\nPSD2 requires banks to provide APIs that regulated Account Information Service Providers (AISPs) and Payment Initiation Service Providers (PISPs) can connect to, giving customers the ability to share their data or initiate payments through third-party services without sharing their banking credentials.\n\nFor businesses, PSD2's most visible impact is SCA — the requirement for customers to authenticate payments using at least two of three factors: something they know (password), something they have (phone), or something they are (biometric). This is why online card payments increasingly require a one-time code from your banking app.\n\nFollowing Brexit, the UK transposed PSD2 into UK law, meaning similar obligations apply — though UK rules are diverging slightly as the FCA develops its own open banking framework under the new Data (Use and Access) Act.",
    whyItMatters:
      "PSD2 is the legal foundation for open banking payments — understanding it helps businesses navigate compliance requirements and take advantage of the payment options it enables.",
    relatedTerms: ["open-banking", "strong-customer-authentication", "pis", "ais", "fraud"],
  },
  {
    slug: "qr-code-payment",
    term: "QR Code Payment",
    category: "Open Banking",
    definition:
      "A payment method where a customer scans a QR code with their smartphone to initiate a bank transfer or open banking payment.",
    explanation:
      "A QR code payment encodes a payment link — containing recipient account details and optionally a pre-filled amount and reference — into a scannable image. When a customer scans the QR code with their phone's camera or banking app, they're directed to a payment page or their banking app where they can complete the transfer.\n\nIn the open banking context, QR code payments are particularly useful in physical settings where typing a URL isn't practical: restaurant tables, retail counters, event ticketing, or printed invoices. A scan takes the customer directly to an authorisation page in their banking app, where they approve the specific payment.\n\nQR code payments have been widely adopted in several Asian markets, and are growing in the UK as open banking awareness increases. For businesses, they offer a low-cost way to accept bank transfer payments in person without card terminal infrastructure.\n\nIn the UK context, the most common QR code payment experience is via apps that display a QR code linking to a Faster Payments-based transfer, rather than the dynamic, bilateral QR code model used in some other markets.",
    whyItMatters:
      "QR code payments offer a card-terminal-free way to accept in-person payments at lower cost, particularly suited to low-volume or ad hoc collections.",
    relatedTerms: ["payment-link", "open-banking", "pis", "faster-payments", "one-off-payment"],
  },
  {
    slug: "r-transaction",
    term: "R-Transaction",
    category: "Payments",
    definition:
      "An umbrella term covering all SEPA payment exceptions — returns, refusals, rejections, reversals, and requests for cancellation.",
    explanation:
      "R-transactions are a classification system used within SEPA (and referenced in some UK payment contexts) for payments that don't complete as expected. The 'R' prefix covers several distinct scenarios, each with different causes and handling requirements.\n\nA Return occurs when a payment has been accepted and processed but is subsequently sent back — typically because the account is closed or the beneficiary details don't match. A Refusal occurs before the payment is processed, when the payer's bank refuses to execute it. A Rejection happens when a payment doesn't pass validation and is rejected before processing. A Reversal occurs when the originating bank reverses a payment already credited to the beneficiary — typically for error correction. A Request for cancellation is exactly that — a request by the originator to cancel a payment already submitted.\n\nFor UK businesses using Direct Debit, return codes serve a similar purpose — categorising the reason for failure in a standardised way. Understanding which type of R-transaction or return code you're dealing with determines the correct recovery action.",
    whyItMatters:
      "Understanding the different categories of payment failures helps teams route each exception to the correct recovery process rather than treating all failures the same way.",
    relatedTerms: ["return-code", "failed-payment", "sepa-direct-debit", "nsf", "payment-retry"],
  },
  {
    slug: "reconciliation",
    term: "Reconciliation",
    category: "Reconciliation",
    definition:
      "The process of confirming that financial records in two separate systems match each other — typically comparing payment data against accounting records or bank statements.",
    explanation:
      "Reconciliation is a fundamental accounting control process. At its core, it asks: does what we recorded as having happened match what actually happened? In a payment context, reconciliation means comparing the payments you expected to collect (from your invoicing or billing system) against what actually settled in your bank account.\n\nPayment reconciliation is complicated by several factors: timing differences (a payment submitted on Monday may not settle until Wednesday), returns and failures (payments that didn't complete), partial payments (customers paying less than the full amount), and misapplied references (payments that arrive without a clear reference to the invoice they're paying).\n\nFor businesses collecting many payments — via Direct Debit, open banking, or bank transfer — reconciliation can involve thousands of individual transactions each period. Without automation, matching each transaction to its source and marking invoices as paid is enormously time-consuming.\n\nProper reconciliation is also essential for accurate financial reporting. Unreconciled payments — transactions in the bank that can't be matched to records — distort your reported revenue and cash position.",
    whyItMatters:
      "Accurate, timely reconciliation is the foundation of trustworthy financial reporting and clean cash flow management — errors compound quickly if reconciliation is delayed or skipped.",
    relatedTerms: ["bank-reconciliation", "automated-reconciliation", "settlement", "failed-payment"],
    resources: [
      { label: "Reconciliation with Praevor", href: "/products/reconciliation" },
    ],
  },
  {
    slug: "recurring-payment",
    term: "Recurring Payment",
    category: "Payments",
    definition:
      "A payment that is collected or made automatically on a regular schedule — weekly, monthly, or annually — under a pre-authorised arrangement.",
    explanation:
      "Recurring payments are the foundation of subscription businesses, membership organisations, utility billing, and any service billed on an ongoing basis. The key characteristic is automation — once the arrangement is set up, payments happen on schedule without the customer needing to actively pay each time or the business needing to send a fresh request.\n\nIn the UK, recurring payments most commonly run via Direct Debit (for bank-to-bank collections), continuous payment authority (for card-based recurring billing), or standing orders (where the customer sets up the repetition from their own bank).\n\nDirect Debit is generally preferred for business-to-consumer and business-to-business recurring collection because the business controls the collection date and amount, making cash flow more predictable than standing orders (where the customer controls the instruction).\n\nRecurring payment arrangements should always be clearly disclosed at the point of sale — customers need to understand they are authorising an ongoing collection, not a one-time payment. Unclear recurring billing is a significant source of disputes and indemnity claims.",
    whyItMatters:
      "Recurring payments are the most reliable way to collect subscription or ongoing fees — they eliminate the dependency on customers actively choosing to pay each period.",
    relatedTerms: ["direct-debit", "subscription-billing", "payment-schedule", "standing-order", "advance-notice"],
    resources: [
      { label: "Set up recurring payments", href: "/products/subscription-payments" },
    ],
  },
  {
    slug: "refund",
    term: "Refund",
    category: "Disputes",
    definition:
      "A payment returned to a customer by the business — either because goods or services were not delivered as expected, or as a goodwill gesture.",
    explanation:
      "A refund is a voluntary return of money to a customer initiated by the business. It differs from a chargeback (initiated by the customer's bank) and from an indemnity claim (a Direct Debit-specific mechanism). A refund is the business choosing to return money, typically because of a complaint, cancellation, or error.\n\nFor Direct Debit, a refund is processed as a Bacs Direct Credit — the business sends money back to the customer's account using the same bank details from the mandate. This takes up to three working days to arrive. If the refund is the result of a legitimate customer complaint, processing it promptly reduces the chance the customer also raises an indemnity claim through their bank.\n\nFor card payments, refunds are processed back to the original card. They typically appear on the customer's statement within 3–5 working days, though the customer's bank controls the timing.\n\nBusiness owners should have clear refund policies — both for legal compliance (particularly under consumer protection law) and to protect against chargebacks, since disputes are more likely when customers feel ignored or when the refund process is unclear.",
    whyItMatters:
      "Processing refunds promptly reduces the risk of escalating to a chargeback or indemnity claim, both of which are more expensive and operationally disruptive than a simple refund.",
    relatedTerms: ["chargeback", "indemnity-claim", "dispute", "direct-debit", "bank-transfer"],
  },
  {
    slug: "return-code",
    term: "Return Code",
    category: "Payments",
    definition:
      "A standardised code returned by the banking system to indicate why a payment instruction was not successfully processed.",
    explanation:
      "When a payment fails, the payment scheme or receiving bank returns a code identifying the reason. In the UK Bacs system, return codes (sometimes called ADDACS or ARUDD codes) give specific reasons: 0 (instruction cancelled), 1 (no instruction), 2 (payer deceased), 3 (account transferred to another bank), 4 (advance notice disputed), 5 (insufficient funds), and so on.\n\nReturn codes matter because they determine the correct response. An insufficient funds return (code 5) might warrant a retry in a few days. A 'no instruction' return (code 1) means there was no valid mandate — retrying won't work, and a new mandate is required. A 'payer deceased' return (code 2) requires sensitive handling.\n\nProcessing return codes correctly — routing each to the right workflow — is a significant operational challenge at scale. Treating all failures the same way (for example, retrying everything) leads to wasted retry attempts, compliance issues, and unnecessary contact with customers who have legitimate reasons for cancellation.\n\nGood payment platforms surface return codes clearly and allow businesses to build differentiated workflows for each return reason.",
    whyItMatters:
      "Return codes tell you exactly why a payment failed — using them to route recovery actions intelligently dramatically improves efficiency and reduces unnecessary retries.",
    relatedTerms: ["failed-payment", "nsf", "r-transaction", "payment-retry", "direct-debit"],
  },
  {
    slug: "sandbox",
    term: "Sandbox (Payments)",
    category: "Infrastructure",
    definition:
      "A test environment provided by a payment provider that mimics the live system, allowing developers to build and test integrations without processing real payments.",
    explanation:
      "A sandbox is an isolated test environment that behaves like the real payment system but uses simulated data — no real money moves, no real bank accounts are accessed. Payment providers offer sandboxes so that businesses and developers can build and test integrations, explore API responses, and check that their systems handle edge cases (like failures, returns, and retries) before going live.\n\nIn a sandbox, you can trigger test scenarios that would be difficult or impossible to create in the live environment — simulating a payment failure, a cancelled mandate, an indemnity claim, or a specific return code — to make sure your systems handle them correctly.\n\nSandbox testing is best practice before any payment integration goes live. Deploying untested payment code to production risks real money being moved incorrectly, customers being charged wrongly, or failures causing operational disruption.\n\nMost reputable payment providers offer sandboxes with the same API structure as production, so the same code can be switched to live with minimal changes once testing is complete.",
    whyItMatters:
      "Thorough sandbox testing before going live prevents the kind of payment errors that are expensive to unpick — catching bugs in a test environment is always easier than recovering from them in production.",
    relatedTerms: ["api", "webhook", "payment-gateway", "payment-processor"],
    resources: [
      { label: "Praevor sandbox environment", href: "/developers" },
    ],
  },
  {
    slug: "sepa",
    term: "SEPA",
    category: "Infrastructure",
    definition:
      "The Single Euro Payments Area — a European initiative that standardises euro-denominated electronic payments across member countries.",
    explanation:
      "SEPA is an integration initiative of the European Union that makes euro-denominated bank transfers as simple across borders as they are within a single country. The SEPA zone currently includes all EU member states plus Iceland, Liechtenstein, Norway, Switzerland, Monaco, and the UK (for SEPA Credit Transfers and SEPA Direct Debit purposes).\n\nWithin SEPA, businesses and individuals can send and receive euro payments using the same process, same timeframes, and same cost regardless of whether the sender and recipient are in the same country. This has dramatically simplified pan-European commerce.\n\nSEPA offers three main payment instruments: SEPA Credit Transfer (a standard euro transfer, settled in one working day), SEPA Instant Credit Transfer (arriving in seconds), and SEPA Direct Debit (in both Core and Business-to-Business variants).\n\nFor UK businesses trading with European customers or suppliers, SEPA remains the most efficient way to send and receive euro payments, even post-Brexit. UK banks can still participate in SEPA as non-EEA members.",
    whyItMatters:
      "If your business transacts in euros with European counterparties, SEPA provides the most efficient and cost-effective routing — understanding it helps you set up euro payment collection and disbursement correctly.",
    relatedTerms: ["sepa-direct-debit", "iban", "payment-rail", "bacs", "bank-transfer"],
  },
  {
    slug: "sepa-direct-debit",
    term: "SEPA Direct Debit",
    category: "Direct Debit",
    definition:
      "A euro-denominated recurring payment scheme that allows businesses to collect payments from customers across the SEPA zone, similar to UK Direct Debit but operating across European borders.",
    explanation:
      "SEPA Direct Debit (SDD) is the European equivalent of the UK's Bacs Direct Debit, enabling businesses to collect recurring euro-denominated payments from customers throughout the SEPA zone using a standardised mandate and settlement process.\n\nThere are two SEPA Direct Debit schemes: SDD Core (for consumer accounts) and SDD B2B (for business-to-business transactions, which has stricter validation but fewer refund rights for the payer). Both use the customer's IBAN as the account identifier and require a mandate to be signed before collection.\n\nUnder the SDD Core scheme, payers have up to 8 weeks to claim a refund for an authorised payment and up to 13 months for an unauthorised one — which creates a longer exposure window for businesses compared to the UK scheme. SDD B2B offers no unconditional refund right, which makes it more suitable for business customers.\n\nFor UK businesses with European customers, SEPA Direct Debit offers a way to collect in euros in a familiar, recurring-payment model. It requires either an account with a SEPA-capable provider or a dedicated euro account.",
    whyItMatters:
      "For businesses with European customers, SEPA Direct Debit provides a reliable, low-cost way to collect recurring euro payments without each customer needing to make manual transfers.",
    relatedTerms: ["sepa", "direct-debit", "iban", "r-transaction", "indemnity-claim"],
  },
  {
    slug: "service-user-number",
    term: "Service User Number (SUN)",
    category: "Direct Debit",
    definition:
      "A unique six-digit identifier assigned to every organisation authorised to collect Direct Debit payments via the Bacs scheme.",
    explanation:
      "A Service User Number — or SUN — is the credential that identifies your business within the Bacs Direct Debit scheme. Every payment instruction you submit carries your SUN, so the scheme knows which organisation is making the collection. The SUN also appears on customers' bank statements as part of the Direct Debit reference, helping them identify who has collected from their account.\n\nObtaining a SUN requires sponsorship from a Bacs-approved bank or payment provider. The sponsor takes responsibility for your compliance with Bacs rules and your financial obligations — which is why not every business can get a SUN directly. Banks typically require businesses to meet minimum volume thresholds and pass due diligence checks.\n\nMost SMEs don't hold their own SUN — they use a payment provider that collects on their behalf using the provider's SUN. This is known as a bureau arrangement and removes the complexity and compliance burden of direct Bacs membership.\n\nIf your business grows to significant Direct Debit volumes, obtaining your own SUN gives greater control over mandate management, payment data, and your relationship with the Bacs scheme.",
    whyItMatters:
      "Whether you hold your own SUN or use a bureau, understanding how the SUN works helps you manage your Direct Debit operations, compliance, and customer experience correctly.",
    relatedTerms: ["bacs", "direct-debit", "direct-debit-mandate", "indemnity-claim", "paper-audit-date"],
  },
  {
    slug: "settlement",
    term: "Settlement",
    category: "Settlement",
    definition:
      "The process by which funds collected in a payment transaction are transferred from the payer's account and made available in the payee's account.",
    explanation:
      "Settlement is the completion of a payment — the point at which money actually moves from one bank account to another and becomes available to the recipient. Settlement is distinct from authorisation: an authorised card payment has been approved, but settlement (when the funds actually move) may happen hours or days later.\n\nDifferent payment methods have different settlement timelines. Faster Payments settles in near real time. Bacs Direct Debit settles three working days after submission. Card payments typically settle one to three business days after the transaction, depending on the acquirer and your contract.\n\nFor businesses, settlement timing directly affects cash flow — revenue that has been earned but not yet settled is not available for use. Understanding your settlement cycle helps you accurately forecast when cash will be in your account and avoid planning based on revenue that hasn't cleared yet.\n\nSome payment providers offer faster or instant settlement as an add-on feature, advancing funds before the underlying scheme has completed settlement — useful for businesses with tight cash flow requirements.",
    whyItMatters:
      "Settlement timing is the gap between collecting revenue and having access to it — understanding your settlement cycle is essential for accurate cash flow management.",
    relatedTerms: ["settlement-period", "t-plus-2", "t-plus-3", "instant-settlement", "cash-flow"],
    resources: [
      { label: "Settlement calculator", href: "/resources/settlement-calculator" },
    ],
  },
  {
    slug: "settlement-period",
    term: "Settlement Period",
    category: "Settlement",
    definition:
      "The number of days between a payment being collected and the funds being made available in the receiving business's account.",
    explanation:
      "The settlement period is the delay between payment collection and fund availability. It exists because payment schemes process transactions in batches, banks need time to verify and clear transactions, and there are technical and operational steps between authorisation and final settlement.\n\nFor Direct Debit via Bacs, the settlement period is three working days — often described as T+3 (transaction day plus three days). For Faster Payments, settlement is near-instant. Card payments typically take one to three business days depending on the acquirer.\n\nSettlement periods have significant practical implications. If you run your Direct Debit collection on the 1st of the month, funds won't arrive until the 4th or 5th (accounting for weekends). If your largest supplier payment is also due on the 4th, you need to ensure other cash is available to bridge the gap.\n\nUnderstanding your settlement period — and building it into your cash flow model — prevents unpleasant surprises and helps you time collections optimally relative to when you need the cash.",
    whyItMatters:
      "Knowing your settlement period lets you plan collection dates strategically so funds arrive when you actually need them, rather than discovering a gap at the last minute.",
    relatedTerms: ["settlement", "t-plus-2", "t-plus-3", "instant-settlement", "bacs"],
    resources: [
      { label: "Settlement calculator", href: "/resources/settlement-calculator" },
    ],
  },
  {
    slug: "sort-code",
    term: "Sort Code",
    category: "Infrastructure",
    definition:
      "A six-digit number used in the UK banking system to identify the specific bank and branch where an account is held.",
    explanation:
      "The sort code is the routing number of UK banking — it tells the payment system which bank and branch the account belongs to, so funds can be directed correctly. Sort codes are presented as three pairs of digits separated by hyphens, for example 20-00-00.\n\nEvery UK bank account has a sort code, and in combination with the eight-digit account number, the sort code uniquely identifies any UK bank account. For most UK payments — Direct Debit, Faster Payments, standing orders — the sort code and account number are all that's needed to route a payment.\n\nSort codes are assigned to banks by UK Finance, the financial trade body. The first two digits identify the bank (or bank group), and the remaining digits identify the specific branch or payment processing centre. For many modern challenger banks and payment institutions, the 'branch' is a central processing point rather than a physical branch.\n\nWhen collecting Direct Debit mandates or receiving bank transfer details, sort code validation — checking that the sort code exists and is associated with the right bank — can catch data entry errors before they cause failed payments.",
    whyItMatters:
      "An incorrect sort code is one of the most common causes of a misdirected or failed payment — validating sort codes at point of entry prevents costly errors.",
    relatedTerms: ["account-number", "iban", "direct-debit-mandate", "bank-transfer", "faster-payments"],
  },
  {
    slug: "standing-order",
    term: "Standing Order",
    category: "Direct Debit",
    definition:
      "A regular bank payment set up by the customer to send a fixed amount to a specified account on a recurring schedule.",
    explanation:
      "A standing order is an instruction given by a bank account holder to their bank to pay a fixed amount to a specific recipient on a regular schedule — for example, £500 on the 1st of every month. Unlike Direct Debit, the customer controls the standing order — they set it up, they change the amount, and they cancel it.\n\nThis distinction is crucial for businesses. With Direct Debit, the business initiates the collection and can adjust amounts (with advance notice) — ensuring they always collect exactly what's owed. With a standing order, the customer sends a fixed amount regardless of what's actually due. If an invoice increases, the standing order still pays the old amount until the customer manually updates it.\n\nStanding orders are still common for fixed, regular payments — rent, for example — but for anything where the amount varies (subscription tiers, usage-based billing, annual price increases), they create significant reconciliation and recovery challenges.\n\nFor businesses, the practical advice is to encourage customers to set up Direct Debit rather than standing orders wherever possible, particularly if your pricing changes over time.",
    whyItMatters:
      "Standing orders give control to the customer rather than the business — for variable or changing billing amounts, they create reconciliation issues that Direct Debit avoids.",
    relatedTerms: ["direct-debit", "recurring-payment", "bank-transfer", "payment-schedule", "reconciliation"],
  },
  {
    slug: "strong-customer-authentication",
    term: "Strong Customer Authentication (SCA)",
    category: "Compliance",
    definition:
      "A regulatory requirement for online payments that mandates customers verify their identity using at least two independent factors before a transaction can proceed.",
    explanation:
      "Strong Customer Authentication was introduced under PSD2 to reduce fraud on electronic payments. It requires that when a customer makes or authorises an online payment, they prove their identity using at least two of three categories: something they know (password, PIN), something they have (a mobile phone to receive a one-time code, a hardware token), or something they are (fingerprint, face ID).\n\nIn practice, for online card payments, SCA has meant the widespread rollout of 3D Secure (3DS2) — the pop-up or redirect that asks you to confirm a card payment through your banking app. For open banking payments, SCA is inherent to the process — the customer authenticates directly with their bank.\n\nSCA has exemptions for low-value payments (under €30), trusted beneficiaries, and low-risk transactions identified through transaction risk analysis. These exemptions allow many routine purchases to proceed without interrupting the customer journey.\n\nFor businesses, SCA has added friction to the checkout process, which in some cases has increased abandonment. Optimising SCA implementation — using trusted beneficiary exemptions, requesting the right exemptions at the right time — is an important consideration for high-volume online merchants.",
    whyItMatters:
      "SCA is mandatory for most online card payments — understanding exemptions and implementing them correctly reduces unnecessary checkout friction while maintaining compliance.",
    relatedTerms: ["psd2", "open-banking", "fraud", "pci-dss", "payment-gateway"],
  },
  {
    slug: "subscription-billing",
    term: "Subscription Billing",
    category: "Payments",
    definition:
      "A billing model in which customers are charged a recurring fee at regular intervals in exchange for ongoing access to a product or service.",
    explanation:
      "Subscription billing is the commercial model underlying everything from streaming services and SaaS software to gym memberships and trade publications. Customers pay a regular fee — typically monthly or annually — and in return receive continuous access to whatever the subscription provides.\n\nFrom a billing infrastructure perspective, subscription billing requires: a way to capture and store payment authorisation (a Direct Debit mandate or stored card token), a system to trigger the correct collection at the right time and amount, advance notice of upcoming charges, and a process for handling failures and dunning (chasing failed payments).\n\nSubscription businesses need to pay particular attention to lifecycle events: the first payment (which sets expectations and must be clearly communicated), price increases (which require proper notice and may cause cancellations), pauses and cancellations (which must be processed promptly to avoid indemnity claims), and renewals (particularly for annual subscribers who may have forgotten they signed up).\n\nGood subscription billing infrastructure makes these lifecycle events manageable at scale — the alternative is manual processing that doesn't scale and creates errors.",
    whyItMatters:
      "Subscription billing is highly predictable when the infrastructure is right — the right payment setup converts recurring revenue from an accounting challenge into a reliable, automated cash flow.",
    relatedTerms: ["recurring-payment", "direct-debit", "payment-schedule", "failed-payment", "advance-notice"],
    resources: [
      { label: "Subscription payments with Praevor", href: "/products/subscription-payments" },
    ],
  },
  {
    slug: "t-plus-2",
    term: "T+2 Settlement",
    category: "Settlement",
    definition:
      "A settlement timeline in which funds are transferred to the recipient's account two business days after the transaction date.",
    explanation:
      "T+2 settlement means that money received (or collected) on a given day — 'T' for transaction date — will appear in the recipient's account two business days later. This is a common settlement timeline for card payments via many acquiring banks, and also used for some securities and financial instrument transactions.\n\nFor example, if you process card payments on a Monday, under T+2 settlement the funds would arrive in your merchant account on Wednesday (assuming no bank holidays). Weekend days are excluded from the count, so transactions on Friday wouldn't settle until the following Tuesday.\n\nT+2 is faster than the T+3 associated with Bacs Direct Debit, but still slower than Faster Payments-based open banking payments, which settle in near real time.\n\nThe T+2 timeline exists partly because of batch processing in card settlement, partly to allow time for fraud and error checks, and partly due to the operational realities of interbank settlement cycles. Some payment providers offer faster settlement — effectively advancing funds to the merchant before T+2 — as a premium service.",
    whyItMatters:
      "Knowing your settlement timeline helps you plan cash flow accurately and avoid situations where collected revenue isn't yet available when you need to use it.",
    relatedTerms: ["settlement", "settlement-period", "t-plus-3", "instant-settlement", "acquiring-bank"],
    resources: [
      { label: "Settlement calculator", href: "/resources/settlement-calculator" },
    ],
  },
  {
    slug: "t-plus-3",
    term: "T+3 Settlement",
    category: "Settlement",
    definition:
      "A settlement timeline in which funds are transferred to the recipient's account three business days after the transaction date — the standard for UK Direct Debit via Bacs.",
    explanation:
      "T+3 is the standard settlement cycle for Direct Debit payments processed through the Bacs scheme. When you submit a Direct Debit collection on Day 1 (T), the funds leave the customer's account on Day 2 and are credited to your account on Day 3. Weekends and bank holidays don't count in this cycle.\n\nIn practice, this means that for a collection intended to arrive on a given date, you need to submit to Bacs at least three working days before that date. Submit too late and the collection misses the intended date, which can have knock-on effects for cash flow forecasting and advance notice compliance.\n\nThe T+3 cycle is a long-standing characteristic of Bacs — it reflects the batch processing nature of the scheme, which has historically prioritised reliability and scale over speed. Unlike Faster Payments, which settled near-instantly from the start, Bacs was designed for high-volume predictable processing rather than real-time transactions.\n\nFor businesses relying on Direct Debit collections, building the T+3 cycle into cash flow planning is essential — funds won't arrive until three working days after submission, not on the date of submission.",
    whyItMatters:
      "The T+3 Bacs cycle means Direct Debit funds arrive three days after submission — planning your collection submission dates around your actual cash need dates prevents timing gaps.",
    relatedTerms: ["bacs", "settlement", "settlement-period", "t-plus-2", "direct-debit"],
    resources: [
      { label: "Settlement calculator", href: "/resources/settlement-calculator" },
    ],
  },
  {
    slug: "tokenisation",
    term: "Tokenisation",
    category: "Infrastructure",
    definition:
      "The process of replacing sensitive payment data — such as a card number — with a non-sensitive placeholder (a token) that can be used in payment systems without exposing the underlying data.",
    explanation:
      "Tokenisation is a security technique that removes sensitive data from systems that don't need direct access to it. In a card payment context, when a customer enters their card number, the payment system immediately replaces it with a token — a random string of characters that maps to the real card number only within the secure vaults of the tokenisation provider.\n\nAll subsequent processing — storing the customer's payment method for future use, initiating recurring payments, reconciling transactions — can be done using the token rather than the real card number. Even if an attacker gains access to the tokenised data, it is useless without the mapping between token and real card number, which is held separately.\n\nTokenisation is a fundamental component of PCI DSS compliance — by ensuring raw card numbers are never stored on merchant systems, it dramatically reduces the scope and cost of PCI compliance for businesses.\n\nFor Direct Debit and open banking payments, the equivalent concept is securely storing and referencing mandate IDs or consent tokens rather than raw bank account details.",
    whyItMatters:
      "Tokenisation is what allows businesses to store customers' payment methods for recurring use without holding sensitive card data — it's the foundation of secure repeat billing.",
    relatedTerms: ["encryption", "pci-dss", "payment-gateway", "recurring-payment", "strong-customer-authentication"],
  },
  {
    slug: "variable-direct-debit",
    term: "Variable Direct Debit",
    category: "Direct Debit",
    definition:
      "A Direct Debit arrangement where the amount collected from a customer can change from one payment to the next, provided adequate advance notice is given.",
    explanation:
      "Most people think of Direct Debit as a fixed monthly amount — and many mandates do work that way. But the Bacs scheme also supports variable Direct Debit, where the amount collected each time can differ, as long as the customer is given advance notice of each amount before it is collected.\n\nVariable Direct Debit is used in a variety of situations: utility bills (where usage varies month to month), professional services firms billing for different amounts of time each month, SaaS businesses with usage-based pricing components, and any subscription model with variable elements.\n\nThe key compliance requirement is advance notice. For each collection where the amount differs from the last, the customer must be informed of the new amount before the collection date. The standard notice period is 10 working days, though this can be varied by agreement with the customer.\n\nVariable Direct Debit is one of the most powerful tools in UK payment infrastructure — it combines the predictability and control of Direct Debit collection with the flexibility to accurately reflect what the customer actually owes.",
    whyItMatters:
      "Variable Direct Debit lets you collect precisely what each customer owes each period, without the rounding or approximation that comes with fixed-amount mandates — improving both accuracy and cash flow.",
    relatedTerms: ["direct-debit", "direct-debit-mandate", "advance-notice", "subscription-billing", "payment-schedule"],
  },
  {
    slug: "webhook",
    term: "Webhook",
    category: "Infrastructure",
    definition:
      "An automated notification sent by a payment provider to a business's system when a specific event occurs — such as a payment succeeding, failing, or being reversed.",
    explanation:
      "A webhook is a way for a payment platform to push real-time information to your systems when something happens. Instead of your system having to repeatedly ask 'has this payment settled yet?' (polling), the payment platform proactively sends a notification to a URL you specify at the moment the event occurs.\n\nCommon payment webhook events include: payment collected successfully, payment failed (with return code), mandate set up, mandate cancelled, refund processed, and settlement completed. Each notification typically includes a JSON payload with details about the event.\n\nWebhooks are what allow your accounting software to update the invoice status the moment a payment is collected, your CRM to note a successful renewal, or your operations team to be alerted the moment a significant payment fails.\n\nFor businesses using payment APIs, webhooks are essential for building responsive, automated workflows — without them, you're effectively checking manually or running periodic imports, both of which introduce delays and errors.",
    whyItMatters:
      "Webhooks are the connective tissue between your payment provider and the rest of your business — they're what make automated reconciliation, real-time alerts, and trigger-based workflows possible.",
    relatedTerms: ["api", "sandbox", "automated-reconciliation", "payment-processor"],
    resources: [
      { label: "Praevor webhook documentation", href: "/developers" },
    ],
  },
  {
    slug: "white-label",
    term: "White-Label Payments",
    category: "Infrastructure",
    definition:
      "A payment solution built by one provider but deployed and presented under another business's brand, allowing that business to offer payments without building the infrastructure themselves.",
    explanation:
      "White-label payments allow businesses to offer payment collection, disbursement, or financial services to their customers under their own brand name, while the underlying infrastructure, compliance, and operations are handled by a specialist payment provider working behind the scenes.\n\nFor example, an accounting software provider might want to offer its customers the ability to collect Direct Debits from within the software, without becoming a payment provider themselves. By working with a white-label payment platform, the accounting software company can offer this capability branded as their own product, without building Bacs connectivity, obtaining FCA authorisation, or managing payment operations.\n\nWhite-label arrangements vary in depth — from simply rebadging a hosted payment page, to deep API-level integrations where every customer interaction is fully branded by the reselling business with no visibility of the underlying provider.\n\nFor end customers, the experience is seamless — they interact only with the brand they already know. For the business deploying the white-label solution, it creates a new revenue stream or product capability without the full investment of building payment infrastructure from scratch.",
    whyItMatters:
      "White-label payments let businesses add payment capabilities to their product without the regulatory and infrastructure burden — it is often the fastest route to offering financial services to your customers.",
    relatedTerms: ["embedded-finance", "api", "payment-gateway", "payment-processor"],
    resources: [
      { label: "White-label with Praevor", href: "/partners" },
    ],
  },
  {
    slug: "working-capital",
    term: "Working Capital",
    category: "Payments",
    definition:
      "The difference between a business's current assets (including cash and receivables) and its current liabilities, representing the funds available to meet short-term operational needs.",
    explanation:
      "Working capital is the financial cushion that allows a business to operate day to day — paying suppliers, covering payroll, funding stock, and meeting other short-term obligations — while waiting for revenue to arrive. A business can be profitable on paper but still fail if it runs out of working capital.\n\nThe two main drivers of working capital strain for SMEs are: slow collection of receivables (customers taking longer to pay than expected) and timing mismatches (costs are due before revenue from sales arrives). Both are directly affected by payment infrastructure.\n\nDirect Debit collection reduces working capital requirements by making revenue arrival predictable — if you know exactly when payments will settle, you can plan accordingly. Reducing your payment failure rate, shortening settlement periods, and lowering Days Sales Outstanding all reduce the amount of working capital your business needs to carry.\n\nFor fast-growing businesses, working capital can be a binding constraint even when demand is strong — more revenue means more receivables in flight, and each pound of outstanding receivable is a pound of working capital required.",
    whyItMatters:
      "Improving payment reliability and settlement speed directly reduces the working capital required to run your business — it is one of the most direct levers finance teams have on capital efficiency.",
    relatedTerms: ["cash-flow", "days-sales-outstanding", "settlement-period", "failed-payment", "payment-terms"],
  },
];
