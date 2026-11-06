import introductionStudy from "./criminalLawI/introductionStudy.json";
import { criminalLawIOverview } from "./criminalLawI/overview";
import introductionProvisions from "./criminalLawI/introductionProvisions.json";
import { attemptOffencesChapter } from "./criminalLawI/attemptChapter";
import { intimidationOffencesChapter } from "./criminalLawI/intimidationChapter";
import { defamationOffencesChapter } from "./criminalLawI/defamationChapter";
import { crueltyOffencesChapter } from "./criminalLawI/crueltyChapter";
import { marriageOffencesChapter } from "./criminalLawI/marriageChapter";
import { serviceOffencesChapter } from "./criminalLawI/serviceChapter";
import { documentOffencesChapter } from "./criminalLawI/documentChapter";
import { propertyOffencesChapter } from "./criminalLawI/propertyChapter";
import { createChapterModel } from "../../models/ChapterModel";
import { createCourseModel } from "../../models/CourseModel";

export const CRIMINAL_LAW_I_COURSE_ID =
  "criminal-law-i-transitioning-from-ipc-to-bns";

export const criminalLawICourse = createCourseModel({
  id: CRIMINAL_LAW_I_COURSE_ID,
  title: "Criminal Law I (Transitioning from IPC to BNS)",
  slug: CRIMINAL_LAW_I_COURSE_ID,
  shortDescription: criminalLawIOverview.shortDescription,
  description: criminalLawIOverview.description,
  duration: "Self-paced",
  courseType: "subject-course",
  accessType: "paid-enrollment",
  certificationAvailable: true,
  certificationFee: 49,
  liveClasses: {
    enabled: true,
    price: 499,
    sessionCount: 8,
    provider: "Google Meet",
  },
  featured: false,
  order: 6,
  totalChapters: 26,
  status: "draft",
  createdBy: "system",
  updatedBy: "system",
  seo: {
    title:
      "IPC to BNS Notes & Criminal Law Course",
    description: criminalLawIOverview.seoDescription,
    focusKeyword: "IPC to BNS notes",
    secondaryKeywords: [
      "criminal law notes for LLB",
      "Bharatiya Nyaya Sanhita study material",
      "IPC vs BNS comparison",
      "BNS 2023 notes",
      "Criminal Law I course",
    ],
    canonicalUrl:
      "/courses/criminal-law-i-transitioning-from-ipc-to-bns",
  },
});

const chapterOneOverview = introductionStudy.overview;
const chapterOneLearningObjectives = introductionStudy.objectives;
const chapterOneKeyPoints = introductionStudy.keyPoints;
const chapterOneProvisions = introductionStudy.sources.map((source) => `${source.title}: ${source.url}`);
const chapterOneExamFocus = introductionStudy.examFocus;
const chapterOneRevisionNotes = introductionStudy.keyPoints.join("\n");
const chapterOneDetailedContent = [
  introductionStudy.title, introductionStudy.enactmentDate, introductionStudy.preamble,
  "Transition and application", introductionStudy.transition,
  ...introductionStudy.groups.flatMap((group) => [
    group.title, group.explanation,
    ...introductionProvisions.filter((row) => group.sections.includes(row.ipc))
      .map((row) => `IPC ${row.ipc} - ${row.title}\n${row.statusNote}\nSupplied IPC text\n${row.statutoryText}\nBNS mapping: ${row.bns}\nStudy explanation\n${row.note}`),
  ]),
  "Practice questions and model answers",
  ...introductionStudy.practice.map((item, index) => `${index + 1}. ${item.question}\nAnswer: ${item.answer}`),
  "Official reading", ...introductionStudy.sources.map((source) => `${source.title}\n${source.url}`),
].join("\n\n");

const chapterTwoOverview =
  "This chapter explains how the general definitions and interpretive rules of substantive criminal law control the meaning of every offence. It studies IPC Sections 6–52A alongside their reorganised counterparts in BNS Sections 2 and 3. The chapter covers statutory interpretation, persons and public authorities, property and dishonest intention, documents and electronic records, acts and omissions, joint criminal liability, injury, good faith, voluntarily caused effects and harbouring. It also identifies repealed or obsolete IPC expressions and explains why the transition is a consolidation rather than a section-for-section renumbering.";

const chapterTwoLearningObjectives = [
  "Explain why every offence and penal provision must be read with the statutory definitions, explanations and General Exceptions.",
  "Map the principal concepts in IPC Sections 6–52A to BNS Sections 2 and 3 without assuming a false one-to-one correspondence.",
  "Apply the definitions of person, public servant, movable property, wrongful gain, wrongful loss, dishonestly and fraudulently.",
  "Distinguish reason to believe from suspicion and good faith from mere honesty.",
  "Explain the expanded BNS treatment of documents, including electronic and digital records.",
  "Analyse acts, illegal omissions, common intention, intentional cooperation and differing liability among participants.",
  "Use definitions such as offence, illegal, injury, voluntarily and harbour in problem questions.",
  "Identify obsolete IPC definitions and material additions introduced by the BNS.",
];

const chapterTwoKeyPoints = [
  "IPC Sections 6–52A supplied definitions and interpretive rules used throughout the IPC.",
  "BNS Section 2 consolidates the principal definitions, while BNS Section 3 consolidates the general explanations and rules of joint liability.",
  "IPC Section 6 corresponds in substance to BNS Section 3(1), and IPC Section 7 to BNS Section 3(2).",
  "There is no reliable section-for-section conversion for every provision; the BNS groups concepts by subject.",
  "Dishonesty requires an intention to cause wrongful gain or wrongful loss; fraudulently requires an intent to defraud.",
  "Reason to believe requires sufficient cause, while good faith requires due care and attention.",
  "Under the BNS, document expressly includes electronic and digital records.",
  "Words referring to acts include illegal omissions unless the context indicates otherwise.",
  "Common intention creates joint liability only when a criminal act is done by several persons in furtherance of the shared intention.",
  "Participants in the same criminal act may be guilty of different offences because their intentions, knowledge or circumstances differ.",
  "Obsolete IPC expressions such as Queen, British India and Government of India do not reappear as operative BNS definitions.",
  "The BNS adds definitions such as child, transgender, mental illness and electronic communication that were not collected in IPC Chapter II in the same form.",
];

const chapterTwoProvisions = [
  "Indian Penal Code, 1860 — Sections 6–7: General interpretive rules",
  "Indian Penal Code, 1860 — Sections 8–21: Persons, Government, judges, courts and public servants",
  "Indian Penal Code, 1860 — Sections 22–31: Property, dishonest or fraudulent conduct, documents and valuable security",
  "Indian Penal Code, 1860 — Sections 32–38: Acts, omissions and joint criminal liability",
  "Indian Penal Code, 1860 — Sections 39–44: Voluntarily, offence, law, illegality and injury",
  "Indian Penal Code, 1860 — Sections 45–52A: Life, death, animal, vessel, time, oath, good faith and harbour",
  "Bharatiya Nyaya Sanhita, 2023 — Section 2: Definitions",
  "Bharatiya Nyaya Sanhita, 2023 — Section 3: General explanations",
  "Information Technology Act, 2000 — Section 2(1): Relevant technology definitions",
  "Mental Healthcare Act, 2017 — Section 2(1)(s): Mental illness",
];

const chapterTwoExamFocus =
  "In a problem question, identify the offence first and then isolate every defined expression used in it. State the applicable IPC or BNS provision, apply the precise mental element, and distinguish suspicion from reason to believe, honesty from good faith, and motive from dishonest or fraudulent intention. For group conduct, separately prove participation, common intention or the required knowledge and explain why liability may differ between participants. In comparative answers, organise IPC Sections 6–52A by subject and map them to BNS Sections 2–3; do not claim that every old section has an individually numbered BNS equivalent.";

const chapterTwoRevisionNotes =
  "IPC Sections 6–52A are reorganised mainly in BNS Sections 2 and 3. Section 2 BNS contains consolidated definitions; Section 3 contains general explanations, including reading provisions subject to General Exceptions, consistent use of defined expressions, possession through a spouse, clerk or servant, acts including illegal omissions, common intention, joint knowledge or intention, combined acts and omissions, intentional cooperation, and differing offences among participants. Dishonestly depends on wrongful gain or wrongful loss; fraudulently depends on intent to defraud; reason to believe requires sufficient cause; and good faith requires due care and attention. The BNS expressly recognises electronic and digital records and omits obsolete colonial definitions.";

const chapterThreeOverview =
  "This chapter explains the punishments available under the Indian Penal Code and their reorganisation under the Bharatiya Nyaya Sanhita. It studies IPC Sections 53–75 alongside BNS Sections 4–13, including death, imprisonment for life, rigorous and simple imprisonment, forfeiture, fine, community service, commutation, fractions of punishment, default imprisonment for non-payment of fine, limits against duplicative punishment, solitary confinement and enhanced punishment after previous conviction. Repealed and transitional IPC provisions are identified separately so that historical rules are not presented as current law.";

const chapterThreeLearningObjectives = [
  "Identify every punishment recognised by IPC Section 53 and BNS Section 4.",
  "Explain community service as the additional punishment expressly recognised under the BNS.",
  "Distinguish a judicial sentence from executive commutation of that sentence.",
  "Explain how imprisonment for life is treated when calculating fractions of a term.",
  "Distinguish rigorous imprisonment from simple imprisonment.",
  "Apply the consolidated BNS rules governing fines and imprisonment in default of payment.",
  "Explain the safeguards against excessive or duplicative punishment for composite offences.",
  "Describe the statutory limits governing solitary confinement.",
  "Apply the enhanced-punishment rule following a qualifying previous conviction.",
  "Identify repealed IPC provisions that have no operative BNS counterpart.",
];

const chapterThreeKeyPoints = [
  "IPC Section 53 corresponds to BNS Section 4, which expressly adds community service.",
  "IPC Sections 54–55 are substantially consolidated in BNS Section 5 on commutation of sentence.",
  "IPC Section 55A has no separately numbered BNS equivalent; governmental authority must be read with the BNS and BNSS framework.",
  "IPC Section 57 corresponds to BNS Section 6: life imprisonment is reckoned as twenty years only for calculating fractions of punishment.",
  "IPC Section 60 corresponds to BNS Section 7 and permits imprisonment to be wholly rigorous, wholly simple or partly each where the offence allows either description.",
  "IPC Sections 63–70 are consolidated in BNS Section 8, with updated monetary limits for default imprisonment where the offence is punishable with fine or community service only.",
  "IPC Sections 71–75 correspond respectively to BNS Sections 9–13.",
  "Solitary confinement remains strictly limited by both the sentencing ceiling and the manner of execution.",
  "Repealed IPC Sections 56, 58, 59, 61 and 62 have no operative BNS equivalent.",
  "Punishment must always be imposed within the text of the offence, the general punishment provisions and constitutional safeguards.",
];

const chapterThreeProvisions = [
  "Indian Penal Code, 1860 — Sections 53–60: Kinds of punishment, commutation and imprisonment",
  "Indian Penal Code, 1860 — Sections 61–70: Forfeiture, fines and default imprisonment",
  "Indian Penal Code, 1860 — Sections 71–75: Composite offences, solitary confinement and enhanced punishment",
  "Bharatiya Nyaya Sanhita, 2023 — Section 4: Punishments",
  "Bharatiya Nyaya Sanhita, 2023 — Section 5: Commutation of sentence",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 6–7: Fractions and description of imprisonment",
  "Bharatiya Nyaya Sanhita, 2023 — Section 8: Fine and default imprisonment",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 9–10: Limits where several offences are involved",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 11–12: Solitary confinement",
  "Bharatiya Nyaya Sanhita, 2023 — Section 13: Enhanced punishment after previous conviction",
  "Bharatiya Nagarik Suraksha Sanhita, 2023 — Section 474: Commutation of sentence",
  "Constitution of India — Articles 20 and 21",
];

const chapterThreeExamFocus =
  "Begin by identifying the punishment authorised by the particular offence. Then apply the relevant general rule in IPC Sections 53–75 or BNS Sections 4–13. Distinguish sentence, commutation and remission; state that the twenty-year equivalence for life imprisonment is limited to calculating fractions; and calculate default imprisonment separately from substantive imprisonment. For composite offences, test the statutory bar on excessive multiple punishment. Comparative answers should highlight community service, consolidation of the fine provisions in BNS Section 8, and the absence of operative counterparts for repealed IPC provisions.";

const chapterThreeRevisionNotes =
  "IPC Section 53 maps to BNS Section 4, with community service added. IPC Sections 54–55 are consolidated in BNS Section 5; IPC Section 57 maps to BNS Section 6; Section 60 maps to BNS Section 7; Sections 63–70 are consolidated in BNS Section 8; and Sections 71–75 map to BNS Sections 9–13. Life imprisonment counts as twenty years only for calculating fractions. Default imprisonment is additional but ends when the fine is paid or proportionately satisfied. Solitary confinement is limited in total duration and execution. Repealed IPC Sections 56, 58, 59, 61 and 62 have no operative BNS equivalent.";

const chapterFourOverview =
  "This chapter explains the General Exceptions under IPC Sections 76–106 and their direct counterparts in BNS Sections 14–44. It covers mistake of fact, judicial acts, accident, necessity, infancy, unsoundness of mind, intoxication, consent, good-faith acts for another person's benefit, compulsion, slight harm, and the right of private defence of body and property. Each exception is conditional and must be applied ingredient by ingredient.";

const chapterFourLearningObjectives = [
  "Distinguish mistake of fact from mistake of law.",
  "Apply accident and necessity only when every statutory condition is proved.",
  "Explain infancy, unsoundness of mind and involuntary intoxication.",
  "Assess legally valid consent and good-faith acts for another person's benefit.",
  "Explain the scope and limits of compulsion and slight harm.",
  "Determine when private defence begins, continues and extends to causing death.",
  "Compare IPC Sections 76–106 with BNS Sections 14–44.",
];

const chapterFourKeyPoints = [
  "IPC Sections 76–106 correspond sequentially to BNS Sections 14–44.",
  "Mistake must be of fact, not law, and the belief must satisfy the statutory good-faith standard.",
  "Accident requires a lawful act, lawful manner, lawful means, absence of criminal intention or knowledge, and proper care and caution.",
  "Necessity requires good faith, no criminal intention to cause harm, and prevention of a sufficiently imminent greater harm.",
  "A child under seven has absolute immunity; a child above seven and under twelve is protected only when sufficiently immature on the occasion.",
  "Legal insanity concerns cognitive incapacity at the time of the act, not merely a medical diagnosis.",
  "Consent obtained through fear or misconception, or from a person lacking legal capacity, is ineffective.",
  "Private defence is preventive and proportionate; it is not a right of retaliation.",
];

const chapterFourProvisions = [
  "Indian Penal Code, 1860 — Sections 76–81: Legal duty, mistake, accident and necessity",
  "Indian Penal Code, 1860 — Sections 82–86: Infancy, unsoundness of mind and intoxication",
  "Indian Penal Code, 1860 — Sections 87–95: Consent, benefit, compulsion and slight harm",
  "Indian Penal Code, 1860 — Sections 96–106: Right of private defence",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 14–19: Legal duty, mistake, accident and necessity",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 20–24: Infancy, unsoundness of mind and intoxication",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 25–33: Consent, benefit, compulsion and slight harm",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 34–44: Right of private defence",
  "Bharatiya Nyaya Sanhita, 2023 — Section 3(1): Penal provisions read subject to General Exceptions",
  "Bharatiya Sakshya Adhiniyam, 2023 — Burden relating to statutory exceptions",
];

const chapterFourExamFocus =
  "Begin with the ingredients of the alleged offence and then identify the exact General Exception. State and apply every condition of that exception. For private defence, analyse reasonable apprehension, commencement, continuance, proportionality, access to public protection and whether causing death was statutorily permitted. Comparative answers should use the direct IPC Section 76–106 to BNS Section 14–44 mapping and identify the law applicable on the date of conduct.";

const chapterFourRevisionNotes =
  "IPC Sections 76–106 map sequentially to BNS Sections 14–44. Mistake of fact may excuse but mistake of law does not. Accident requires proper care and caution. Infancy, unsoundness of mind and involuntary intoxication turn on precise statutory capacity tests. Consent is limited and cannot legalise conduct that is independently criminal. Private defence begins with reasonable apprehension, lasts only while that apprehension continues, and never permits more harm than necessary.";

const chapterFiveOverview =
  "This chapter explains abetment under IPC Sections 107–120 and BNS Sections 45–60. It studies instigation, abetment by conspiracy, intentional aid, the meaning of abettor, cross-border abetment, punishment when the act abetted is or is not committed, liability for different acts or effects, cumulative punishment, presence of the abettor, group abetment, and concealment of criminal designs.";

const chapterFiveLearningObjectives = [
  "Identify instigation, abetment by conspiracy and intentional aid.",
  "Distinguish abetment from criminal conspiracy and mere knowledge.",
  "Explain why completion of the principal offence is not always necessary.",
  "Apply liability for a different act or different effect.",
  "Calculate punishment where the act abetted is or is not committed.",
  "Explain cross-border abetment under the IPC and BNS.",
  "Analyse concealment of criminal designs and public-servant liability.",
];

const chapterFiveKeyPoints = [
  "Abetment has three statutory modes: instigation, qualifying conspiracy and intentional aid.",
  "Wilful misrepresentation or concealment of a material fact may amount to instigation.",
  "The principal act need not always be completed for abetment to exist.",
  "The person abetted need not possess legal capacity or the same guilty intention as the abettor.",
  "Liability for a different act depends on probable consequence and its statutory connection to the abetment.",
  "BNS Section 48 adds abetment outside India for an offence committed in India.",
  "BNS Section 57 increases the maximum imprisonment for group abetment from three years to seven years.",
  "Concealment requires intention to facilitate or knowledge that facilitation is likely.",
];

const chapterFiveProvisions = [
  "Indian Penal Code, 1860 — Sections 107–108A: Abetment, abettor and cross-border abetment",
  "Indian Penal Code, 1860 — Sections 109–117: Punishment and consequential liability",
  "Indian Penal Code, 1860 — Sections 118–120: Concealment of criminal designs",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 45–48: Abetment and cross-border rules",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 49–57: Punishment and consequential liability",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 58–60: Concealment of criminal designs",
  "Bharatiya Nyaya Sanhita, 2023 — Section 61: Criminal conspiracy",
  "Bharatiya Nyaya Sanhita, 2023 — Section 62: General attempt provision",
];

const chapterFiveExamFocus =
  "Identify the precise mode of abetment first. For instigation, prove active encouragement or qualifying wilful deception; for conspiracy-based abetment, prove agreement plus the required act or illegal omission; for intentional aid, prove facilitation and intention. Then determine whether the principal act occurred, whether a different act or effect was a probable or known consequence, whether the abettor was present, and whether an express punishment provision applies. Do not confuse abetment by conspiracy with the separate offence of criminal conspiracy.";

const chapterFiveRevisionNotes =
  "IPC Section 107 maps to BNS Section 45, Section 108 to Section 46, and Section 108A to Section 47. BNS Section 48 adds a reciprocal cross-border rule. IPC Sections 109–120 map to BNS Sections 49–60. Instigation, qualifying conspiracy and intentional aid are distinct modes. Abetment may be complete even if the principal offence is not. Different-act liability requires probable consequence, while different-effect liability requires the prescribed knowledge. BNS Section 57 raises the group-abetment maximum to seven years.";

const chapterSixOverview =
  "This chapter explains criminal conspiracy under IPC Sections 120A–120B and its consolidation in BNS Section 61. It examines the agreement forming the foundation of liability, the two statutory objects of conspiracy, when an overt act is required, the two punishment categories, circumstantial proof of agreement, and the distinctions between criminal conspiracy, abetment by conspiracy and common intention.";

const chapterSixLearningObjectives = [
  "Identify the agreement that forms the core of criminal conspiracy.",
  "Distinguish an agreement to commit an offence from other conspiratorial agreements.",
  "Explain when an overt act is required.",
  "Apply the punishment categories under IPC Section 120B and BNS Section 61(2).",
  "Distinguish criminal conspiracy from abetment by conspiracy and common intention.",
  "Explain how circumstantial evidence may prove agreement without treating association alone as sufficient.",
];

const chapterSixKeyPoints = [
  "Two or more persons and an agreement are essential.",
  "The object may be an illegal act or a lawful act pursued by illegal means.",
  "An agreement to commit an offence needs no further overt act under the statutory proviso.",
  "Other conspiratorial agreements require an act besides the agreement in pursuance of it.",
  "The illegal act may be the ultimate object or merely incidental.",
  "BNS Section 61 consolidates IPC Sections 120A and 120B.",
  "Criminal conspiracy is distinct from abetment by conspiracy and common intention.",
  "Association, relationship, knowledge or presence alone does not necessarily prove agreement.",
];

const chapterSixProvisions = [
  "Indian Penal Code, 1860 — Section 120A: Definition of criminal conspiracy",
  "Indian Penal Code, 1860 — Section 120B: Punishment of criminal conspiracy",
  "Bharatiya Nyaya Sanhita, 2023 — Section 61: Criminal conspiracy",
  "Indian Penal Code, 1860 — Section 107: Abetment by conspiracy",
  "Bharatiya Nyaya Sanhita, 2023 — Section 45(b): Abetment by conspiracy",
  "Indian Penal Code, 1860 — Section 34 and BNS Section 3(5): Common intention",
  "Bharatiya Sakshya Adhiniyam, 2023 — Relevant rules for proof of conspiracy-related facts",
];

const chapterSixExamFocus =
  "Identify the alleged agreement, every party, its object and proposed means. If the object is an offence, explain why no further overt act is required; otherwise identify the act done in pursuance. Select the proper punishment branch by stating the punishment attached to the object offence. Compare criminal conspiracy with abetment by conspiracy and common intention whenever the facts involve coordinated conduct, and connect each accused individually to the agreement.";

const chapterSixRevisionNotes =
  "IPC Section 120A maps to BNS Section 61(1), while IPC Section 120B maps to BNS Section 61(2). Agreement is the foundation of the offence. An overt act is unnecessary where the agreement is to commit an offence; other agreements require an act besides the agreement in pursuance. Serious conspiracy is punished as abetment where no express punishment exists. Other conspiracy carries up to six months, fine, or both. Mere association or knowledge does not by itself establish agreement.";

const chapterSevenOverview =
  "This chapter examines offences relating to the Army, Navy and Air Force under IPC Sections 131–140 and BNS Sections 159–168. It covers abetment of mutiny, assault on a superior officer, desertion, harbouring a deserter, negligent concealment aboard a merchant vessel, insubordination, exclusion of persons governed by service statutes, and deceptive use of military garb or tokens. Repealed IPC Section 138A is identified separately.";

const chapterSevenLearningObjectives = [
  "Explain the graduated liability for abetting mutiny.",
  "Distinguish abetment of assault, desertion and insubordination.",
  "Apply knowledge and reason-to-believe standards in harbouring cases.",
  "Explain negligence-based liability of a merchant-vessel master.",
  "Identify the service-law exclusion and its purpose.",
  "Compare IPC Sections 131–140 with BNS Sections 159–168.",
  "Identify repealed Section 138A and material BNS changes.",
];

const chapterSevenKeyPoints = [
  "IPC Sections 131–140 correspond to BNS Sections 159–168, except repealed IPC Section 138A.",
  "Mutiny and completed mutiny attract different punishment provisions.",
  "The assault provisions require the superior officer to be executing official duty.",
  "Harbouring requires knowledge or reason to believe that the person deserted.",
  "The harbouring exception is now expressed in gender-neutral terms for a spouse.",
  "Merchant-vessel liability may arise through neglect despite ignorance of concealment.",
  "BNS Section 166 increases the insubordination-abettment maximum imprisonment to two years.",
  "Military-garb liability requires deceptive intention, not resemblance alone.",
];

const chapterSevenProvisions = [
  "Indian Penal Code, 1860 — Sections 131–140: Offences relating to the Army, Navy and Air Force",
  "Bharatiya Nyaya Sanhita, 2023 — Sections 159–168: Offences relating to the Army, Navy and Air Force",
  "Army Act, 1950",
  "Air Force Act, 1950",
  "Navy Act, 1957",
  "Bharatiya Nyaya Sanhita, 2023 — Section 167: Persons subject to specified service Acts",
];

const chapterSevenExamFocus =
  "Identify the protected service relationship and the accused's precise conduct. For abetment, prove the applicable mode and consequence. For harbouring, establish knowledge or reason to believe; for merchant-vessel concealment, identify neglect or want of discipline; and for false garb or tokens, prove deceptive intention. State the exclusion for persons governed by the specified service Acts and identify every material BNS wording or punishment change.";

const chapterSevenRevisionNotes =
  "IPC Sections 131–140 map to BNS Sections 159–168, except repealed IPC Section 138A. IPC 131/BNS 159 covers abetting mutiny or seducing service personnel from duty; IPC 132/BNS 160 applies when mutiny follows. The harbouring exception now refers to a spouse. BNS Section 165 raises the merchant-vessel penalty to ₹3,000, Section 166 raises the insubordination maximum to two years, and Section 168 raises the military-garb or token fine to ₹2,000.";


const units = [
  {
    title: "Concept of Crime, Criminal Liability and General Exceptions",
    shortDescription:
      "An introduction to crime and criminal responsibility, the relationship between actus reus and mens rea, criminal jurisdiction, general explanations, and the defences contained in the General Exceptions.",
    overview:
      "Criminal law determines which acts or omissions are offences, fixes the conditions of personal responsibility, and prescribes punishment through law. This chapter builds the foundation required for the entire Criminal Law I course. It explains the concepts of crime and offence, the maxim actus non facit reum nisi mens sit rea, the territorial and extra-territorial reach of Indian criminal law, the interpretative rules known as General Explanations, and the circumstances in which conduct that would ordinarily satisfy an offence is justified or excused. The chapter studies IPC Sections 1–5, 6–52A and 76–106 alongside the corresponding structure of BNS Sections 1–3 and 14–44.",
    learningObjectives: [
      "Define crime and offence and explain their principal legal characteristics.",
      "Distinguish actus reus from mens rea and explain why both ordinarily operate together in criminal liability.",
      "Identify intention, knowledge, recklessness and negligence as legally relevant mental states.",
      "Explain the territorial and extra-territorial jurisdiction of the IPC and the BNS.",
      "Use the General Explanations and statutory definitions when interpreting an offence.",
      "Classify the General Exceptions as justification or excuse and explain their legal effect.",
      "Apply the rules relating to mistake of fact, accident, necessity, infancy, unsoundness of mind, intoxication, consent, compulsion, slight harm and private defence.",
      "Compare the foundational IPC provisions with their reorganised counterparts under the BNS.",
    ],
    detailedContent: `1. Meaning and Nature of Crime

A crime is a public wrong prohibited by criminal law and ordinarily punishable by the State. It may consist of a positive act, an illegal omission, possession in circumstances prohibited by law, or participation in another person's conduct. Although a criminal act may also cause private injury and give rise to civil liability, criminal proceedings focus on the breach of a public duty and the protection of society.

An offence is conduct made punishable by a statute. The legal definition of each offence identifies the prohibited conduct, required circumstances, mental element, consequence, and any special conditions. Moral blame alone does not create an offence; liability must rest upon a valid law defining the prohibited conduct and its punishment.

The principal characteristics of criminal liability are legality, prohibited conduct, a legally required mental element, causation where a consequence forms part of the offence, absence of a valid general or special defence, and punishment according to law.

2. Actus Reus and Mens Rea

The maxim actus non facit reum nisi mens sit rea means that an act does not ordinarily make a person guilty unless the mind is also legally blameworthy. It expresses the general relationship between the external and mental elements of crime.

Actus reus is the external component. Depending on the offence, it may include conduct, an omission where the law imposes a duty to act, prohibited circumstances, possession, and a prohibited consequence. Where a consequence is required, the prosecution must establish the legally relevant connection between the accused's conduct and that consequence.

Mens rea is the mental element specified or implied by the offence. It may take the form of intention, knowledge, reason to believe, dishonesty, fraud, recklessness or negligence. The precise mental state must be identified from the statutory language; mens rea is not identical for every offence.

The maxim is a general principle, not an inflexible formula. A statute may expressly or by necessary implication create liability without proof of a traditional guilty mind. Courts therefore begin with the text, purpose and scheme of the particular provision.

Motive and intention must be distinguished. Intention concerns the result a person means to bring about; motive explains why the person acts. A good motive does not ordinarily legalise prohibited conduct, although motive may be relevant to evidence, sentencing or a specific statutory defence.

3. Transition from the IPC to the BNS

The Bharatiya Nyaya Sanhita, 2023 came into force on 1 July 2024 and replaced the Indian Penal Code, 1860, subject to repeal-and-savings provisions. Conduct is assessed under the law applicable when it occurred, and Article 20(1) of the Constitution protects against retrospective creation of an offence or enhancement of punishment.

The BNS reorganises and renumbers the foundational rules rather than abandoning all IPC principles. IPC Sections 1–5 dealing with operation and jurisdiction are principally reorganised in BNS Section 1. Many IPC definitions and general explanations formerly spread across Sections 6–52A are consolidated in BNS Sections 2 and 3. IPC General Exceptions in Sections 76–106 substantially reappear, with revised numbering and drafting, in BNS Sections 14–44.

Students must therefore learn concepts rather than rely only on old section numbers. For every problem, first identify the date of the alleged conduct, then identify the applicable statute, locate the offence, read the definitions and general explanations, and finally test any exception or defence.

4. Criminal Jurisdiction

IPC Sections 1–5 set out the Code's title, territorial operation, punishment of offences committed within India, extra-territorial application, and the preservation of special and local laws.

BNS Section 1 applies the Sanhita throughout India. It also recognises extra-territorial application to an Indian citizen committing an offence outside India, a person on a ship or aircraft registered in India wherever located, and a person outside India committing an offence that targets a computer resource located in India. A person liable under Indian law for an offence committed beyond India may be dealt with as if the act had occurred within India, subject to applicable procedural and international-law requirements.

Territorial jurisdiction usually depends on a sufficient statutory connection between the offence and India. Questions of where an act was done, where a consequence occurred, nationality, registration of a vessel or aircraft, and the location of a targeted computer resource may therefore be decisive.

5. General Explanations and Definitions

An offence cannot be interpreted in isolation. IPC Sections 6–52A require penal provisions to be read subject to the General Exceptions and contain definitions and explanations used throughout the Code. The BNS consolidates central definitions in Section 2 and general explanations in Section 3.

Important interpretative concepts include person, public, public servant, movable property, wrongful gain and wrongful loss, dishonestly, fraudulently, reason to believe, good faith, document, electronic record, act, omission, voluntarily, injury, common intention, and participation with knowledge or intention.

Good faith requires due care and attention; an honest assertion made carelessly is not necessarily made in good faith. Reason to believe requires sufficient cause, not mere suspicion. Dishonesty concerns an intention to cause wrongful gain or wrongful loss. Voluntariness may include causing an effect by means which the person intended or knew, or had reason to believe, were likely to cause it.

General explanations also address joint conduct. Where several persons act in furtherance of a common intention, or participate in conduct with the mental state required by law, liability may extend beyond the final physical act. The exact statutory ingredients must still be proved against the person concerned.

6. Nature of General Exceptions

General Exceptions prevent liability even where the apparent elements of an offence are present. A justification treats the conduct as legally permitted in the circumstances, such as a proportionate exercise of private defence. An excuse recognises that the act remains harmful but the actor should not be held blameworthy, such as infancy or legally recognised unsoundness of mind.

The exceptions are part of the statutory scheme and must be read with every offence. They are not unlimited permissions. Each exception has conditions, exclusions and, where relevant, requirements of good faith, proportionality, reasonable apprehension, proper care or absence of criminal intention.

7. Acts Required or Justified by Law and Judicial Acts

IPC Sections 76 and 79, corresponding broadly to BNS Sections 14 and 17, protect acts done by a person bound or justified by law, including a good-faith mistake of fact. A mistake of law is not protected. The distinction is whether the error concerns a factual situation or the content of the law.

IPC Sections 77 and 78, corresponding to BNS Sections 15 and 16, protect judicial acts and acts done pursuant to a court's judgment or order within the statutory conditions. The protection supports lawful administration of justice but does not excuse conduct outside those conditions.

8. Accident and Necessity

IPC Section 80 and BNS Section 18 excuse an accident or misfortune occurring while a lawful act is performed in a lawful manner by lawful means, without criminal intention or knowledge, and with proper care and caution. Failure to exercise proper care may remove the protection.

IPC Section 81 and BNS Section 19 address conduct likely to cause harm but done without criminal intention and in good faith to prevent or avoid a greater or more imminent harm. Necessity requires careful assessment of the danger, purpose, proportionality and surrounding facts.

9. Infancy, Unsoundness of Mind and Intoxication

IPC Sections 82–83 and BNS Sections 20–21 recognise absolute immunity for a child under seven and qualified immunity for a child above seven and under twelve who lacks sufficient maturity to understand the nature and consequences of the conduct on that occasion.

IPC Section 84 and BNS Section 22 apply where, because of unsoundness of mind at the time of the act, the person was incapable of knowing the nature of the act or that it was wrong or contrary to law. The legal test concerns capacity at the relevant time, not merely the existence of a medical diagnosis.

IPC Sections 85–86 and BNS Sections 23–24 distinguish involuntary from voluntary intoxication. Intoxication administered without knowledge or against the person's will may excuse incapacity within the statutory test. Voluntary intoxication ordinarily does not remove the knowledge attributed by law, although the precise offence and required intention remain relevant.

10. Consent and Acts for a Person's Benefit

IPC Sections 87–92 and BNS Sections 25–30 govern harm consented to, acts done in good faith for a person's benefit, acts for children or persons of unsound mind through lawful guardians, invalid consent, and emergency acts without consent.

Consent must be legally valid. Consent obtained under fear or misconception, given by a person unable to understand the nature and consequence of the act, or given below the statutory age in the relevant provision may be ineffective. Consent cannot legalise conduct that remains independently criminal regardless of the harm consented to.

IPC Section 93 and BNS Section 31 protect a communication made in good faith for the benefit of the person receiving it, even though the communication causes harm.

11. Compulsion and Trivial Harm

IPC Section 94 and BNS Section 32 provide a limited defence for conduct compelled by threats creating a reasonable apprehension of instant death, subject to express exclusions and the requirement that the person did not voluntarily place himself in that situation.

IPC Section 95 and BNS Section 33 embody the principle de minimis non curat lex: harm so slight that a person of ordinary sense and temper would not complain is not treated as an offence. Context remains critical; conduct is not trivial merely because physical injury is small.

12. Right of Private Defence

IPC Sections 96–106 and BNS Sections 34–44 recognise the right to defend one's own body, another person's body, and movable or immovable property against specified offences. The right is preventive, not retaliatory.

The right begins when a reasonable apprehension of danger arises and continues while that apprehension continues. It is restricted where there is sufficient time to seek protection from public authorities and generally cannot inflict more harm than necessary. The law identifies exceptional circumstances in which the right may extend to causing death; otherwise it extends only to harm short of death.

Private defence is assessed from the circumstances reasonably perceived at the time, not with detached hindsight. The defender need not calculate force with mathematical precision, but the response must remain connected to defence rather than revenge.

13. Method for Solving Problems

For an examination or practical problem, use the following sequence:

(a) identify the alleged act, omission, circumstance and consequence;
(b) identify the offence and applicable statute based on the date of conduct;
(c) separate the actus reus from the required mens rea;
(d) apply relevant definitions and General Explanations;
(e) check causation and participation, where applicable;
(f) test each condition of any claimed General Exception;
(g) consider statutory limits, good faith, proportionality and evidence; and
(h) state a reasoned conclusion rather than merely naming a section.`,
    keyPoints: [
      "A crime is a public wrong made punishable by law; moral blame by itself is insufficient.",
      "Actus reus concerns prohibited conduct, circumstances, omissions or consequences; mens rea is the legally required mental state.",
      "The maxim actus non facit reum nisi mens sit rea is a general principle subject to the language and purpose of the statute.",
      "Motive explains why a person acted, while intention concerns the result meant to be produced.",
      "The BNS came into force on 1 July 2024; the date of conduct determines which substantive law applies.",
      "IPC Sections 1–5 correspond principally to the operation and jurisdiction framework in BNS Section 1.",
      "IPC Sections 6–52A are reorganised mainly through BNS Sections 2–3.",
      "IPC Sections 76–106 substantially correspond to BNS Sections 14–44.",
      "A mistake of fact may support an exception where statutory conditions are satisfied; a mistake of law does not.",
      "Accident requires a lawful act, lawful manner, lawful means, absence of criminal intention or knowledge, and proper care and caution.",
      "The legal test for unsoundness of mind concerns incapacity at the time of the act.",
      "Consent must be free, informed and legally competent within the applicable statutory rule.",
      "Private defence is preventive, begins with reasonable apprehension, and is limited by necessity and proportionality.",
      "Every criminal-law problem should be analysed through offence, actus reus, mens rea, definitions, causation and available exceptions.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Sections 1–5",
      "Indian Penal Code, 1860 — Sections 6–52A",
      "Indian Penal Code, 1860 — Sections 76–106",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 1–3",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 14–44",
      "Constitution of India — Article 20(1)",
    ],
    examFocus:
      "Begin with the applicable statute and date of conduct. Separate actus reus and mens rea, apply the relevant definition or General Explanation, and then test every ingredient and limitation of the claimed General Exception. Comparison questions should identify the IPC provision, its BNS counterpart, and any material change in structure or wording.",
  },
  {
    title: "Abetment",
    shortDescription:
      "A detailed study of instigation, abetment by conspiracy, intentional aid, the legal character of an abettor, cross-border abetment, and liability when the act or effect differs from what was intended.",
    overview:
      "Abetment extends criminal responsibility to a person who intentionally encourages, plans or facilitates another person's conduct. The abettor may be liable even when the principal actor refuses, lacks legal capacity, acts with a different intention, performs a different act, or causes a different effect. This chapter explains IPC Sections 107–113 and their restructured counterparts in BNS Sections 45–53. It distinguishes the three statutory modes of abetment, identifies the mental connection required between the abettor and the act, explains when completion of the principal offence is unnecessary, and provides a method for analysing consequence-based liability.",
    learningObjectives: [
      "Define abetment and identify its three statutory modes.",
      "Explain instigation through express words, conduct, wilful misrepresentation or wilful concealment.",
      "Distinguish abetment by conspiracy from the independent offence of criminal conspiracy.",
      "Determine when an act or illegal omission amounts to intentional aid.",
      "Explain the legal meaning of abettor and why the principal actor need not be legally capable or guilty.",
      "Analyse abetment committed across national borders under the IPC and BNS.",
      "Apply the punishment rule where the act abetted is committed and no special punishment is provided.",
      "Determine liability where the principal actor has a different intention, performs a different act or causes a different effect.",
      "Distinguish abetment from mere knowledge, presence, association, common intention and attempt.",
      "Compare IPC Sections 107–113 with BNS Sections 45–53.",
    ],
    detailedContent: `1. Meaning and Basis of Abetment

A person may contribute to an offence without personally performing its final physical act. The law of abetment imposes responsibility where a person intentionally stimulates, coordinates or facilitates the doing of a thing by another. It prevents a person from escaping liability merely because another individual carried out the immediate act.

Abetment is an independent form of criminal participation. Its existence depends on the abettor's conduct and mental state, not solely on the conviction of the person abetted. The act abetted need not always be completed, and the person induced or assisted need not always be legally capable of committing the offence.

IPC Section 107 defines abetment of a thing. IPC Sections 108 and 108A explain the abettor and cross-border abetment. IPC Sections 109–113 regulate punishment and liability when the act, intention or effect differs. Under the BNS, these rules are reorganised principally in Sections 45–53, while Section 48 adds express coverage for abetment outside India of an offence committed in India.

2. Three Modes of Abetment

IPC Section 107 and BNS Section 45 recognise three distinct modes:

(a) instigating a person to do a thing;
(b) engaging in a conspiracy for doing that thing, followed by an act or illegal omission in pursuance of the conspiracy and in order to do that thing; or
(c) intentionally aiding the doing of that thing by an act or illegal omission.

The prosecution must identify and prove at least one statutory mode. Merely using the word abetment without showing instigation, the special conspiracy requirements, or intentional aid is insufficient.

The thing abetted may be a positive act or an illegal omission. Liability must be connected to the particular conduct encouraged, planned or assisted.

3. Abetment by Instigation

To instigate is to goad, urge, provoke, incite, encourage or stimulate another person to act. Instigation may be conveyed through spoken or written words, directions, threats, deliberate conduct, or a calculated course of dealing. No fixed phrase is necessary; the court examines the meaning and effect of the conduct in its context.

An angry or careless remark does not automatically become instigation. The alleged words or conduct must reveal the required intention and a sufficiently direct connection with the thing abetted. Context, persistence, authority, relationship between the parties, surrounding acts and proximity to the proposed conduct may all be relevant.

Explanation 1 to IPC Section 107, retained in BNS Section 45, treats wilful misrepresentation or wilful concealment of a material fact that a person is bound to disclose as instigation when it voluntarily causes, procures, or attempts to cause or procure the thing to be done.

The concealment must be wilful, the fact must be material, and there must be a duty to disclose it. Innocent error, silence without a legal duty, or an immaterial omission does not satisfy this rule.

Instigation may be complete even if the person instigated refuses to act. For example, if A intentionally urges B to murder C and B refuses, A may nevertheless have committed abetment, subject to the applicable punishment provision.

4. Abetment by Conspiracy

The second mode requires:

(a) an engagement between the abettor and one or more persons in a conspiracy for doing the thing; and
(b) an act or illegal omission in pursuance of that conspiracy and in order to the doing of that thing.

Agreement alone is not sufficient for abetment by conspiracy under this limb; the required act or illegal omission must follow. The act need not itself be illegal if it is done in pursuance of the plan and in order to accomplish the thing abetted.

Abetment by conspiracy must be distinguished from the substantive offence of criminal conspiracy. For the abetment mode, the statutory act or illegal omission in pursuance is essential. Criminal conspiracy is separately defined and may, depending on its object, be complete upon agreement under its own statutory conditions. The two concepts overlap but are not interchangeable.

A person need not communicate directly with every participant if the evidence proves intentional participation in the relevant plan and the required act or omission. Mere knowledge that others have formed a plan is not the same as engaging in it.

5. Abetment by Intentional Aid

A person intentionally aids when, by an act or illegal omission, that person deliberately facilitates the doing of the thing. Explanation 2 to IPC Section 107 and BNS Section 45 recognises aid where something is done before or at the time of commission in order to facilitate the act and the conduct in fact facilitates it.

Aid may include supplying a weapon, providing transport, opening access, disabling security, keeping watch, sharing material information, or deliberately omitting a legal duty so that the act can occur. The form of assistance depends on the facts.

The aid must be intentional. Mere presence, accidental assistance, passive knowledge, association with the offender, or failure to prevent an offence where no legal duty exists will not ordinarily constitute intentional aid. Presence may become relevant where it was intended to encourage, protect or facilitate the principal actor.

An illegal omission can amount to aid where the alleged abettor was legally bound to act and deliberately failed to do so for the purpose of facilitating the thing. The source and content of the legal duty must be identified.

6. Who Is an Abettor?

IPC Section 108 and BNS Section 46 describe an abettor as a person who abets the commission of an offence or an act that would be an offence if performed by a person legally capable of committing it with the same intention or knowledge as the abettor.

Several consequences follow:

First, an illegal omission may be abetted even where the abettor is not personally bound to perform the omitted duty.

Second, completion of the act abetted is not essential to the existence of abetment. The required consequence of the principal offence also need not occur.

Third, the person abetted need not possess legal capacity, guilty intention or knowledge. A person who intentionally uses a child or a person of unsound mind as an instrument may remain liable as an abettor.

Fourth, abetment of abetment is itself an offence. A may be liable for intentionally inducing B to induce C to commit an offence.

Fifth, an abettor may participate through one mode while the intermediate participant uses another. The evidence must establish the mental and causal connection required by the relevant statutory provision.

7. Mental Element of Abetment

Abetment is not established by objective assistance alone. Instigation must be intentional; participation in the conspiracy must be conscious and directed to the thing; aid must be intentionally provided.

The abettor's mens rea is assessed separately from that of the principal actor. The law expressly deals with situations in which the principal acts with a different intention or knowledge. The abettor's liability therefore depends on what the abettor intended, knew, facilitated and could legally foresee under the applicable provision.

Motive may provide evidentiary context but does not replace proof of intention. A person may have a hostile motive yet not abet the offence; conversely, a person may intentionally aid for financial gain without sharing the principal actor's personal motive.

8. Cross-Border Abetment

IPC Section 108A and BNS Section 47 cover a person in India who abets an act outside India that would constitute an offence if committed in India.

BNS Section 48 additionally states that a person outside India who abets an act in India, which would constitute an offence if committed in India, commits abetment under the BNS. This express two-way formulation is an important feature of the transition to the BNS.

Cross-border questions require attention to the location of the abettor, the principal act, the intended consequence, the statutory jurisdiction rule, and applicable criminal procedure.

9. Punishment Where the Act Abetted Is Committed

IPC Section 109 and BNS Section 49 apply where the act abetted is committed in consequence of the abetment and the governing law contains no express provision for punishing that abetment. The abettor is then punished with the punishment provided for the principal offence.

The expression in consequence of the abetment requires a connection between the abetment and the act. The principal act need not be performed in precisely the manner imagined, but the statutory rules governing variations must be applied.

Where another provision specifically prescribes punishment for the particular abetment, that special provision governs instead of the general residual rule.

10. Different Intention or Knowledge of the Principal Actor

IPC Section 110 and BNS Section 50 address a case in which the person abetted performs the act with an intention or knowledge different from that of the abettor. The abettor is punished according to the offence that would have been committed if the act had been done with the abettor's intention or knowledge.

This provision keeps the assessment of the abettor's culpability tied to the abettor's own mental state rather than automatically adopting the principal actor's state of mind.

11. Different Act Done

IPC Section 111 and BNS Section 51 extend liability where one act is abetted but a different act is done, provided the different act was a probable consequence of the abetment and was committed under the influence of the instigation, aid or conspiracy.

The test is not whether any later act occurred, but whether the different act was sufficiently connected and was a probable consequence of what was abetted. A wholly independent act falling outside that connection should not automatically be attributed to the abettor.

12. Cumulative Liability for the Act Abetted and the Act Done

IPC Section 112 and BNS Section 52 apply where the different act for which the abettor is liable constitutes an offence distinct from the act abetted. The abettor may be punished for each offence.

The provision prevents the additional distinct offence from being absorbed into the original abetment where the statutory conditions for liability are satisfied.

13. Different Effect Caused

IPC Section 113 and BNS Section 53 address a case where the act abetted produces an effect different from the effect intended by the abettor. Liability for the actual effect arises where the abettor knew that the act abetted was likely to cause that effect.

Knowledge of likelihood is essential. The rule does not impose unlimited liability for every remote or unexpected result. The court must identify the intended effect, actual effect, abettor's knowledge, and causal relationship.

14. Distinguishing Related Concepts

Abetment and common intention are different. Abetment focuses on instigation, conspiracy with the required further act, or intentional aid. Common intention concerns joint participation in a criminal act in furtherance of a shared intention under its statutory rule.

Abetment and criminal conspiracy are also different. Criminal conspiracy is a substantive offence based on an unlawful agreement under the applicable provision. Abetment by conspiracy requires the additional act or illegal omission specified in the definition of abetment.

Abetment and attempt operate at different stages. Abetment concerns intentionally influencing or assisting another's conduct. Attempt concerns conduct by the accused moving sufficiently towards commission of an offence after preparation.

Mere approval, knowledge, relationship, presence or failure to object is not automatically abetment. Each fact must be connected to a statutory mode and the required intention.

15. Method for Solving Abetment Problems

Use the following sequence:

(a) identify the precise thing or offence allegedly abetted;
(b) identify whether the allegation is instigation, conspiracy-based abetment, intentional aid, or more than one mode;
(c) specify the words, acts, agreement or illegal omissions relied upon;
(d) prove the abettor's required intention or knowledge;
(e) determine whether the principal act was committed and whether it occurred in consequence of the abetment;
(f) identify any difference in the principal actor's intention, the act performed or the effect caused;
(g) apply IPC Sections 109–113 or BNS Sections 49–53 as appropriate;
(h) consider territorial and cross-border rules;
(i) distinguish abetment from mere presence, association, knowledge, common intention, conspiracy and attempt; and
(j) reach a reasoned conclusion for each alleged abettor separately.`,
    keyPoints: [
      "Abetment may be committed by instigation, conspiracy with the required further act or illegal omission, or intentional aid.",
      "Instigation may arise through words, conduct, wilful misrepresentation or wilful concealment of a material fact that must be disclosed.",
      "Abetment by conspiracy requires an act or illegal omission in pursuance of the plan and in order to do the thing.",
      "Intentional aid must be deliberate and must facilitate the thing; accidental assistance or passive knowledge is insufficient.",
      "Mere presence is not automatically abetment, but intended presence may encourage or facilitate an offence.",
      "An illegal omission may constitute aid only where a legal duty to act exists and the omission is intentional.",
      "The act abetted need not be completed for abetment to exist.",
      "The principal actor need not be legally capable or share the abettor's guilty intention or knowledge.",
      "Abetment of abetment is itself an offence.",
      "IPC Section 108A and BNS Section 47 address abetment in India of an act outside India.",
      "BNS Section 48 expressly covers abetment outside India of an offence committed in India.",
      "IPC Section 109 and BNS Section 49 provide the residual punishment rule when the act is committed and no special punishment exists.",
      "Liability may continue where the principal has a different intention, does a different probable act, or causes a different effect known to be likely.",
      "IPC Sections 110–113 correspond principally to BNS Sections 50–53.",
      "Abetment must be distinguished from common intention, substantive criminal conspiracy and attempt.",
      "Each abetment problem should identify the mode, mens rea, connection, completed conduct, variation and applicable punishment provision.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Section 107",
      "Indian Penal Code, 1860 — Sections 108–108A",
      "Indian Penal Code, 1860 — Sections 109–113",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 45–48",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 49–53",
    ],
    examFocus:
      "For every problem, identify the exact mode of abetment and prove its mental element. Distinguish abetment by conspiracy from criminal conspiracy, and intentional aid from mere knowledge or presence. Where the principal conduct varies, apply the separate rules for different intention, different act, cumulative offences and different effect. Comparative answers should map IPC Sections 107–113 to BNS Sections 45–53 and specifically note the cross-border rule added in BNS Section 48.",
  },
  {
    title: "Criminal Conspiracy",
    shortDescription:
      "A detailed study of unlawful agreement, common design, overt-act requirements, circumstantial proof, continuing conspiracy, membership and punishment under IPC Sections 120A–120B and BNS Section 61.",
    overview:
      "Criminal conspiracy punishes the agreement through which two or more persons combine to pursue an illegal object or a lawful object by illegal means. Because coordinated criminal plans are commonly formed in secrecy, the law focuses on the meeting of minds and permits the agreement to be proved through connected circumstances. This chapter explains the statutory definition, the point at which the offence becomes complete, the different overt-act rules, the mental element, participation and withdrawal, evidentiary reasoning, punishment, and distinctions from abetment by conspiracy, common intention, unlawful assembly and attempt. It compares IPC Sections 120A–120B with the consolidated rule in BNS Section 61.",
    learningObjectives: [
      "Define criminal conspiracy and identify every element of the statutory agreement.",
      "Distinguish an agreement to commit an offence from an agreement pursuing another illegal object or illegal means.",
      "Explain when agreement alone completes the offence and when an overt act is additionally required.",
      "Identify the mental element and common design necessary to make a person a party to the conspiracy.",
      "Distinguish mere knowledge, association, discussion or presence from intentional participation.",
      "Explain how a conspiracy may be proved through direct or circumstantial evidence.",
      "Analyse the scope, duration, entry, continuation and termination of a conspiracy.",
      "Apply the punishment categories under IPC Section 120B and BNS Section 61(2).",
      "Distinguish criminal conspiracy from abetment by conspiracy, common intention, unlawful assembly and attempt.",
      "Compare IPC Sections 120A–120B with BNS Section 61 and solve conspiracy-based legal problems.",
    ],
    detailedContent: `1. Nature and Purpose of Criminal Conspiracy

Criminal conspiracy addresses collective criminal planning at the stage of agreement. The law recognises that a planned combination may create a danger greater than isolated individual conduct: participants can divide tasks, pool information and resources, conceal responsibility, and increase the likelihood that the unlawful object will be achieved.

The offence does not require every conspirator to perform the final prohibited act. Liability rests on intentional membership in the unlawful agreement, subject to the statutory requirements concerning its object and any necessary act in pursuance.

IPC Section 120A defines criminal conspiracy and Section 120B provides punishment. The BNS combines definition and punishment in Section 61 without materially abandoning the central agreement-based structure.

2. Statutory Definition

Under IPC Section 120A, two or more persons commit criminal conspiracy when they agree:

(a) to do, or cause to be done, an illegal act; or
(b) to do, or cause to be done, an act that is not illegal by illegal means.

BNS Section 61(1) uses the same essential structure and refers to two or more persons agreeing with the common object to do or cause to be done an illegal act, or a lawful act by illegal means.

The agreement is the foundation of the offence. A common intention existing independently in different minds is not enough; there must be a meeting of minds concerning the unlawful object or means. The agreement may be express or inferred from coordinated conduct and circumstances.

The illegal act may be the ultimate objective or merely incidental to a broader plan. The explanation to the definition makes that distinction immaterial if the statutory requirements are otherwise satisfied.

3. Meaning of Illegal Act and Illegal Means

The planned object may itself be an offence, another act prohibited by law, or an act furnishing ground for civil action within the governing statutory definition of illegal. A conspiracy is therefore not confined to plans for offences alone.

A lawful objective may become a criminal conspiracy when the parties agree to achieve it through illegal means. For example, obtaining a lawful commercial advantage does not protect an agreement to use forged documents, intimidation or bribery to secure that advantage.

The prosecution must identify the alleged illegal object or illegal means with reasonable clarity. A vague allegation that the accused persons acted together, without identifying what they agreed to accomplish and how it was illegal, does not establish the statutory offence.

4. Agreement as the Gist of the Offence

The offence centres on consensus, not merely parallel behaviour. The parties need not execute a formal contract, meet in one place, use a particular form of words, or record the plan in writing. A tacit understanding may suffice if the evidence proves intentional agreement.

The parties need not settle every operational detail. A conspirator may perform a specialised role and may not know every participant or every step, provided the evidence shows intentional participation in the common unlawful design.

However, knowledge of another person's plan is not by itself agreement. Sympathy, family or business association, presence at a meeting, communication with an offender, or conduct consistent with innocence cannot automatically establish membership. The inference must arise from proved circumstances that reasonably demonstrate conscious commitment to the common design.

5. When the Offence Becomes Complete

The statutory proviso creates two categories.

First, where the agreement is to commit an offence, the criminal conspiracy is complete upon the agreement itself. No separate overt act is required by the general definition, although later acts may be important evidence of the agreement and may constitute additional offences.

Second, where the agreement concerns an illegal act that is not an offence, or a lawful act to be accomplished by illegal means, some act besides the agreement must be done by one or more parties in pursuance of it. The additional act demonstrates movement of the plan beyond bare consensus.

The required act need not necessarily be independently illegal. It must be an act beyond the agreement, performed by a party in pursuance of the agreed design.

6. Mens Rea and Common Design

Criminal conspiracy requires intentional agreement. A person must know the essential unlawful object or means and intend to participate in advancing it. Accidental assistance or innocent interaction does not make a person a conspirator.

A participant need not possess the same personal motive as others. One may seek money, another revenge, and another institutional advantage; differing motives do not prevent a common agreement concerning the unlawful object.

Where a statute creates a specialised conspiracy offence with additional mental requirements, those requirements must also be proved. The general provision cannot be applied without regard to the wording of the alleged substantive offence.

7. Single and Multiple Conspiracies

A single conspiracy may contain several stages, transactions and participants where they are connected by one common unlawful design. Participants may enter at different times and perform different roles.

Separate plans should not be treated as one conspiracy merely because they involve a common central person or resemble one another. The court considers the common objective, interdependence of activities, overlap of participants, time, place, methods and whether each group was aware of and benefited from the broader design.

In a chain arrangement, each link may understand that success depends on other links. In a hub-and-spoke arrangement, separate dealings with a central person do not automatically establish one overall conspiracy unless the alleged spokes shared or knowingly contributed to the common design.

8. Entry, Continuation and Withdrawal

A person becomes liable upon intentionally joining the conspiracy while it exists. A later entrant is not automatically responsible for every act done before joining, although earlier events may explain the nature of the agreement and prove knowledge.

A conspiracy may continue until its objective is achieved, abandoned, frustrated, or otherwise terminated. Acts of concealment are not automatically part of the original conspiracy; whether they are included depends on the proved scope of the agreement rather than an assumption that every conspirator always intends concealment.

Withdrawal requires more than private change of mind. Clear communication or conduct inconsistent with continued participation may be relevant, but withdrawal does not erase liability already incurred. A withdrawing participant may also need to take reasonable steps appropriate to the circumstances if seeking to prevent further reliance on prior assistance.

9. Proof of Conspiracy

Direct evidence of an unlawful agreement is uncommon because conspiracies are usually secret. The agreement may be inferred from a coherent combination of proved circumstances, including communications, meetings, coordinated movements, division of roles, transfer of funds or materials, acquisition of instruments, false documentation, surveillance, concealment, and conduct before or during execution.

Circumstantial proof must form a reliable chain pointing to intentional agreement. Each circumstance should first be proved; suspicion cannot replace evidence, and one ambiguous circumstance should not be stretched into a complete conspiracy.

Acts and statements of participants may become relevant under the law of evidence when made in reference to the common design during its operation. The court must first have reasonable ground to believe that the conspiracy existed and must respect the statutory conditions governing relevance. Statements made after the common design ended require separate analysis and are not automatically admissible against all former participants.

A confession or admission by one person cannot casually be treated as conclusive proof against everyone else. The applicable evidence law and procedural safeguards must be followed.

10. Conduct Before, During and After the Agreement

Pre-agreement conduct may provide background but ordinarily cannot make a person liable as a conspirator before joining. Conduct during the conspiracy can prove membership, object, role and continuation.

Post-offence conduct may support an inference where it was contemplated by the common design or independently shows consciousness of guilt. But routine association, later silence or isolated assistance after completion does not necessarily prove participation in the original agreement.

The prosecution and defence should therefore place every alleged act on a timeline: before formation, during operation, after achievement, or after termination.

11. Punishment under IPC Section 120B

IPC Section 120B divides punishment into two principal classes.

Where the conspiracy is to commit an offence punishable with death, imprisonment for life, or rigorous imprisonment for a term of two years or more, and no express punishment is otherwise provided for that conspiracy, a party is punished in the same manner as if that person had abetted the offence.

For other criminal conspiracies, punishment may extend to imprisonment of either description for six months, or fine, or both.

If a special provision expressly punishes conspiracy to commit a particular offence, that provision must be considered instead of automatically applying the residual rule.

12. Punishment under BNS Section 61

BNS Section 61(2) substantially preserves the same two categories.

A party to a conspiracy to commit an offence punishable with death, imprisonment for life, or rigorous imprisonment for two years or more is, where the BNS makes no express punishment for that conspiracy, punished as if the party had abetted the offence.

A party to another criminal conspiracy may be punished with imprisonment of either description up to six months, or fine, or both.

A sound answer should classify the object offence, check whether an express conspiracy punishment exists, and only then apply the relevant residual category.

13. Criminal Conspiracy and Abetment by Conspiracy

These concepts must not be confused.

For criminal conspiracy under IPC Section 120A or BNS Section 61, an agreement to commit an offence is ordinarily complete without proof of an overt act.

For abetment by conspiracy under IPC Section 107 or BNS Section 45, an act or illegal omission must occur in pursuance of the conspiracy and in order to the doing of the thing.

Criminal conspiracy is a substantive offence. Abetment by conspiracy is one mode of participating in the thing abetted. The same facts may require analysis under both provisions, but the ingredients must be proved separately and duplication in punishment must be addressed according to law.

14. Distinction from Common Intention

Common intention is a principle of joint liability connected to participation in a criminal act done in furtherance of the shared intention. Criminal conspiracy punishes the antecedent agreement itself under its statutory conditions.

Conspiracy does not invariably require presence at or participation in the final physical act. Common-intention liability ordinarily depends on participation in the criminal act, assessed under the applicable provision.

Evidence may support both, but neither concept should be used as a substitute for proving the ingredients of the other.

15. Distinction from Unlawful Assembly

An unlawful assembly involves the statutorily required number of persons and a prohibited common object. Criminal conspiracy requires at least two persons and an agreement.

Membership of an unlawful assembly may develop suddenly and may be inferred from assembly, conduct, weapons, purpose and surrounding facts. Conspiracy focuses on the agreement and may exist even where conspirators never gather as one assembly.

16. Distinction from Attempt

Conspiracy is complete at the agreement stage where the object is an offence. Attempt requires an act towards the commission of an offence that has passed beyond mere preparation under the governing rule.

A person may be guilty of conspiracy even though execution never begins. If execution advances, attempt or the completed substantive offence may arise in addition, subject to legal rules governing charges and punishment.

17. Defences and Common Analytical Errors

A defence may challenge the existence of any agreement, the accused's knowledge of the unlawful object, intentional membership, identity, authenticity of communications, continuity of the plan, or the interpretation of ambiguous circumstances.

Common errors include treating association as agreement, combining unrelated transactions into one conspiracy, assuming that every participant knew every fact, relying on acts after termination without proving continuing design, and failing to identify whether an overt act was statutorily required.

The prosecution need not prove every detail of the plan, but it must prove the core agreement and the accused's intentional connection to it beyond the applicable standard.

18. Method for Solving Conspiracy Problems

Use the following sequence:

(a) identify the persons alleged to have agreed;
(b) state the exact illegal object or lawful object pursued by illegal means;
(c) identify evidence of a meeting of minds;
(d) classify whether the agreement is to commit an offence;
(e) decide whether agreement alone is sufficient or an overt act is required;
(f) prove the accused's knowledge and intentional participation;
(g) define the scope and duration of the common design;
(h) distinguish one overall conspiracy from multiple independent plans;
(i) place each act and statement on the timeline;
(j) determine the applicable offence and punishment category;
(k) distinguish conspiracy from abetment, common intention, unlawful assembly and attempt; and
(l) reach a separate reasoned conclusion for each accused person.`,
    keyPoints: [
      "Agreement is the gist of criminal conspiracy.",
      "At least two persons must share a meeting of minds concerning the unlawful object or means.",
      "The agreement may concern an illegal act or a lawful act to be achieved by illegal means.",
      "Where the agreement is to commit an offence, agreement alone ordinarily completes the conspiracy.",
      "For other conspiracies, an act beyond the agreement must be done in pursuance of it.",
      "The overt act need not itself be illegal, but it must advance the agreed design.",
      "Mere knowledge, association, discussion, presence or parallel conduct does not automatically prove agreement.",
      "A conspirator need not know every participant or operational detail but must intentionally join the common design.",
      "Different personal motives do not prevent one conspiracy where the unlawful object is shared.",
      "Conspiracy is commonly proved through a connected chain of circumstances because direct evidence is rare.",
      "Each incriminating circumstance must be proved; suspicion cannot substitute for evidence.",
      "A later entrant is not automatically liable for conduct occurring before intentional entry into the conspiracy.",
      "Withdrawal does not erase liability already incurred and must be shown by clear communication or conduct.",
      "IPC Section 120B and BNS Section 61(2) retain two principal punishment categories.",
      "Criminal conspiracy differs from abetment by conspiracy because the latter requires an act or illegal omission in pursuance.",
      "Criminal conspiracy differs from common intention, which concerns joint liability for a criminal act.",
      "Criminal conspiracy can exist before conduct reaches the stage of attempt.",
      "Every conspiracy problem should identify the agreement, object, overt-act rule, participation, duration, proof and punishment separately.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Section 120A",
      "Indian Penal Code, 1860 — Section 120B",
      "Bharatiya Nyaya Sanhita, 2023 — Section 61",
    ],
    examFocus:
      "Begin with the alleged agreement and state its precise unlawful object or means. Determine whether the object is an offence, because that controls whether agreement alone is sufficient or an additional overt act is required. Prove intentional membership through a connected evidentiary chain, define the scope and duration of the plan, and classify punishment correctly. Comparative answers should explain that IPC Sections 120A–120B are consolidated in BNS Section 61 while the central agreement-based structure remains substantially intact.",
  },
  {
    title: "Offences against the State",
    shortDescription:
      "Study IPC Sections 121–130 alongside BNS Sections 147–158: waging war, sedition and sovereignty, foreign States, and prisoners of State or war.",
    overview:
      "IPC Chapter VI, Of Offences Against the State, covers Sections 121–130, including Section 121A and the historical Section 124A. The corresponding provisions are in BNS Chapter VII, Sections 147–158. This chapter distinguishes war against India, coercion of constitutional authorities, speech-related offences, acts against friendly foreign States and offences involving State prisoners or prisoners of war. IPC Section 124A and BNS Section 152 have materially different elements; compare their wording and apply the statute in force on the date of the alleged conduct.",
    learningObjectives: [
      "Explain the purpose and special character of offences against the State.",
      "Distinguish waging war from riot, unlawful assembly, terrorism and ordinary violent crime.",
      "Identify the ingredients of waging, attempting and abetting war under IPC Section 121 and BNS Section 147.",
      "Apply the special conspiracy rule in IPC Section 121A and BNS Section 148.",
      "Distinguish conspiracy, collection of arms, concealment, preparation and attempt.",
      "Explain liability for assaulting or overawing the President or a Governor under IPC Section 124 and BNS Section 151.",
      "Describe the historical ingredients and constitutional limits of IPC Section 124A.",
      "Analyse BNS Section 152 without treating it as a simple renumbering of sedition.",
      "Differentiate protected criticism and dissent from conduct satisfying the statutory offence.",
      "Choose the applicable IPC or BNS provision according to the date of conduct and Article 20(1).",
      "Map IPC Sections 125–127 to BNS Sections 153–155 and distinguish war, depredation and knowing receipt of property.",
      "Map IPC Sections 128–130 to BNS Sections 156–158 and distinguish voluntary release, negligent escape and knowing assistance.",
    ],
    detailedContent: `1. Nature and Purpose of Offences against the State

These offences address grave attacks upon the existence, sovereignty and lawful authority of the State. Their protected interest is broader than the safety of an individual office-holder or the maintenance of peace at one location. Because punishments are severe and constitutionally protected speech may be implicated, every statutory ingredient must be proved strictly.

The chapter's historical IPC range is Sections 121–124A. Under the BNS, the closest provisions are Sections 147–152 in Chapter VII. Similar subject matter does not mean that every BNS provision is identical to its IPC predecessor.

2. Waging War: Meaning and Legal Character

"War" in this context is not confined to formally declared warfare between nations. It involves force directed against the Government of India with the object of challenging or overpowering governmental authority. The scale, organisation, object, weapons, targets and manner of the operation are relevant.

An ordinary riot, local disturbance, private revenge attack or resistance to a particular official act does not automatically become waging war. The decisive inquiry is the common design: was the force directed against governmental authority as such? The prosecution must prove this object rather than rely only on the seriousness of violence.

3. IPC Section 121 and BNS Section 147

IPC Section 121 punishes a person who wages war against the Government of India, attempts to wage such war, or abets the waging of such war. BNS Section 147 substantially preserves these three forms of liability.

The completed offence requires participation in waging war with the required knowledge and intention. Attempt applies when conduct has moved beyond preparation and is sufficiently proximate to waging war. Abetment applies according to the governing abetment rules even if the accused does not personally carry out the principal physical attack.

Both provisions prescribe death or imprisonment for life and fine. The severity makes precise proof of the prohibited object and the accused's participation essential.

4. Conspiracy to Wage War

IPC Section 121A and BNS Section 148 punish conspiracy, whether formed within or beyond India, to commit an offence of waging, attempting or abetting war, or to overawe the Central Government or a State Government by criminal force or show of criminal force.

For this special conspiracy offence, no act or illegal omission in pursuance of the conspiracy is necessary. The agreement itself is the gist, but the prosecution must still prove a genuine meeting of minds and the particular prohibited object. Mere association, radical opinion, discussion or presence is insufficient.

Punishment may be imprisonment for life or imprisonment extending to ten years, together with fine.

5. Collecting Arms or Making Preparations

IPC Section 122 and BNS Section 149 address collecting men, arms or ammunition, or otherwise preparing to wage war, with the intention of waging war or being prepared to wage war against the Government of India.

The offence combines an objective preparatory act with a specific intention. Possessing weapons or assembling persons is not enough without proof of the prohibited purpose. Conversely, an abstract intention without the statutory preparatory conduct does not satisfy this section.

The offence is punishable with imprisonment for life or imprisonment extending to ten years and fine.

6. Concealing a Design to Wage War

IPC Section 123 and BNS Section 150 punish concealment, by an act or illegal omission, of the existence of a design to wage war where the concealment is intended to facilitate, or is known to be likely to facilitate, that design.

The prosecution must establish the design, the accused's awareness of it, concealment by conduct or legally significant omission, and the required intention or knowledge concerning facilitation. Mere silence is not automatically criminal unless the statutory conditions, including an illegal omission where alleged, are proved.

Punishment may extend to ten years and fine.

7. Assaulting the President or a Governor

IPC Section 124 and BNS Section 151 protect the lawful exercise of power by the President of India and a Governor. The offence covers assaulting, wrongfully restraining, attempting wrongfully to restrain, or overawing by criminal force or show of criminal force, with the intention of inducing or compelling the authority to exercise, or refrain from exercising, a lawful power.

The offence is not established merely because the victim holds constitutional office. The prohibited conduct and the coercive intention relating to exercise of lawful power must both be proved. Punishment may extend to seven years and fine.

8. Historical Sedition under IPC Section 124A

IPC Section 124A historically punished words, signs, visible representations or other conduct that brought or attempted to bring into hatred or contempt, or excited or attempted to excite disaffection towards the Government established by law in India. "Disaffection" included disloyalty and feelings of enmity.

Its explanations protected lawful disapprobation of government measures or administrative action when expressed with a view to lawful alteration and without exciting or attempting to excite hatred, contempt or disaffection. The distinction between government established by law and individual office-holders was important.

IPC Section 124A historically provided imprisonment for life with possible fine, imprisonment up to three years with possible fine, or fine. It must now be studied principally for historical offences, constitutional development and comparison with the BNS.

9. Constitutional Limit on the Historical Provision

Article 19(1)(a) protects freedom of speech and expression, subject to reasonable restrictions under Article 19(2), including in the interests of the sovereignty and integrity of India, security of the State and public order.

The judicially narrowed understanding of IPC Section 124A connected criminal liability to incitement to violence or a tendency to create public disorder, rather than treating strong criticism or political dissent by itself as sedition. A problem answer should examine the words, context, audience, intention, likely effect and connection to violence or public disorder.

10. BNS Section 152: Sovereignty, Unity and Integrity

BNS Section 152 does not use the word "sedition". It applies where a person, purposely or knowingly, by spoken or written words, signs, visible representation, electronic communication, use of financial means or otherwise, excites or attempts to excite secession, armed rebellion or subversive activities; encourages feelings of separatist activities; endangers the sovereignty, unity and integrity of India; or indulges in or commits such act.

Punishment is imprisonment for life or imprisonment extending to seven years, and fine. The express inclusion of electronic communication and financial means is significant, but the prosecution must still prove the prescribed mental element and prohibited conduct.

11. Lawful Criticism under BNS Section 152

The explanation to Section 152 preserves comments expressing disapprobation of governmental measures or administrative or other governmental action with a view to obtaining their alteration by lawful means, provided they do not excite or attempt to excite the prohibited activities.

Peaceful disagreement, scholarship, journalism, satire, protest and advocacy do not become offences merely because they are forceful or unpopular. Protection is not unlimited: the precise words, conduct, intention, context and connection to the listed activities must be examined.

12. IPC Section 124A and BNS Section 152 Compared

BNS Section 152 should not be described as IPC Section 124A with a new number. IPC Section 124A focused on hatred, contempt or disaffection towards the Government established by law. BNS Section 152 instead lists secession, armed rebellion, subversive activities, separatist feelings and danger to sovereignty, unity and integrity, and expressly covers electronic communications and financial means.

Both contain an explanation protecting specified lawful criticism, but their ingredients and punishment structures differ. Comparative answers must state these differences before analysing the facts.

13. Applicable Law and the Transition Date

The BNS came into force on 1 July 2024. Alleged conduct before that date must be analysed under the applicable IPC law and savings provisions; conduct on or after that date is analysed under the BNS. Article 20(1) prevents retrospective creation of criminal liability and retrospective enhancement of punishment.

If conduct spans both periods, each alleged act should be placed on a timeline and analysed under the law governing it. Courts, not labels used by investigators or parties, determine the legally applicable provision.

14. Mens Rea and Evidentiary Assessment

Intent, knowledge and purpose are commonly inferred from proved circumstances: communications, selection of targets, organisation, weapons, financing, instructions, concealment, coordinated conduct and statements made in context. Possession, association or ideology alone cannot replace proof of the statutory mental element.

Digital evidence must be authenticated and interpreted in full context. Isolated extracts, forwarded material, parody, news reporting and private discussion may carry different meanings. Evidence of financing must connect the accused, funds and prohibited activity rather than rest on coincidence.

15. Stages of Liability

The provisions create a progression of distinct liability: agreement under the special conspiracy provision; collection or other preparation with the required intention; concealment intended or known to facilitate the design; attempt sufficiently proximate to waging war; and completed waging of war. Abetment may attach through its own rules.

These stages must not be merged. The same facts may support alternative or additional charges, but every count requires its own ingredients and applicable punishment.

16. Distinction from Public-Order and Other Offences

Offences against the State differ from unlawful assembly and rioting, which principally concern public tranquillity, and from ordinary offences against persons or property. Serious violence does not by itself prove war against the Government.

Where terrorism or other special legislation may be relevant, its separate definitions, sanctions and procedural safeguards must be considered. One statutory label cannot substitute for proof under another enactment.

17. Method for Solving Problems

Use the following sequence:

(a) fix the date and identify whether the IPC or BNS applies;
(b) identify the protected interest and exact statutory provision;
(c) separate agreement, preparation, concealment, attempt, abetment and completion;
(d) state the prohibited act and required mental element;
(e) determine whether force was directed against governmental authority as such;
(f) connect each accused separately to the alleged design;
(g) assess speech in its full context and apply Articles 19(1)(a) and 19(2);
(h) for BNS Section 152, identify the precise listed activity allegedly excited, encouraged or committed;
(i) consider lawful criticism and other statutory explanations;
(j) apply Article 20(1) and the repeal-and-savings framework; and
(k) reach a reasoned conclusion on each offence without relying on labels alone.

18. War against a Foreign State at Peace with India: IPC Section 125 and BNS Section 153

These provisions address waging, attempting to wage or abetting war against the government of a foreign State at peace with the Government of India. The IPC uses the expression Asiatic Power in alliance or at peace with India; the BNS uses any foreign State at peace with India. The target, relationship with India and accused person's conduct must each be established. Punishment may be life imprisonment with possible fine, imprisonment up to seven years with possible fine, or fine.

19. Depredation: IPC Section 126 and BNS Section 154

Depredation concerns predatory incursions on the territory of a power at peace with India, including preparations to commit such acts. BNS Section 154 refers to the territory of any foreign State at peace with India. The prosecution must identify the intended territory, the acts of depredation or preparation, and the connection to the accused. Punishment can extend to seven years, with fine and forfeiture of property used, intended for use or acquired through the depredation.

20. Receiving Property from War or Depredation: IPC Section 127 and BNS Section 155

Both sections require receiving property with knowledge that it was taken through the offences described in the preceding two provisions. Mere possession without the required knowledge does not suffice. The punishment can extend to seven years, with fine and forfeiture of the property received. In a problem, trace the property to the underlying offence and prove the recipient's knowledge.

21. Voluntary Escape of a State Prisoner or Prisoner of War: IPC Section 128 and BNS Section 156

A public servant who has custody of such a prisoner and voluntarily permits escape commits this offence. Establish the accused's public-servant status, custody, the prisoner's legal status, escape and voluntary permission. Punishment is life imprisonment or imprisonment up to ten years, and fine. Distinguish intentional release from negligence under the following provision.

22. Negligent Escape: IPC Section 129 and BNS Section 157

This is the separate offence where a public servant with custody negligently suffers a State prisoner or prisoner of war to escape from confinement. The prosecution must prove the duty of custody, a negligent failure and the resulting escape; it need not prove a voluntary decision to release the prisoner. Punishment is simple imprisonment up to three years and fine.

23. Aiding Escape, Rescue or Harbouring: IPC Section 130 and BNS Section 158

Knowingly assisting a State prisoner or prisoner of war to escape, rescuing or attempting rescue, harbouring or concealing a person who escaped, or resisting recapture falls within these provisions. A prisoner on parole within set geographical limits is treated as escaping if they go beyond those limits. Punishment is life imprisonment or imprisonment up to ten years, and fine. Identify the accused's knowledge and precise mode of assistance; unlike Sections 128–129, this offence is not confined to the public servant holding custody.

24. Revision Map

IPC 121 → BNS 147; 121A → 148; 122 → 149; 123 → 150; 124 → 151; historical 124A compared with, but not simply renumbered as, BNS 152; 125 → 153; 126 → 154; 127 → 155; 128 → 156; 129 → 157; 130 → 158. The IPC calls this Chapter VI, while the BNS locates the corresponding offences in Chapter VII.`,
    keyPoints: [
      "Waging war requires force directed against the Government of India with the prohibited object; serious violence alone is insufficient.",
      "IPC Section 121 and BNS Section 147 punish waging, attempting to wage and abetting war.",
      "IPC Section 121A and BNS Section 148 punish the special conspiracy at the agreement stage without requiring an overt act.",
      "Collection of persons, arms or ammunition requires the specific intention stated in IPC Section 122 or BNS Section 149.",
      "Concealment requires awareness of a design and intention or knowledge that concealment will facilitate it.",
      "IPC Section 124 and BNS Section 151 require coercive conduct plus intention concerning exercise of lawful constitutional power.",
      "IPC Section 124A is a historical provision for pre-BNS study and cannot be applied without its constitutional limits.",
      "Strong criticism, dissent or disapprobation does not by itself establish the historical sedition offence.",
      "BNS Section 152 does not use the term sedition and is not a simple renumbering of IPC Section 124A.",
      "Section 152 expressly addresses secession, armed rebellion, subversive activities, separatist feelings and danger to sovereignty, unity and integrity.",
      "BNS Section 152 expressly includes electronic communication and use of financial means.",
      "The mental element under BNS Section 152 is purposely or knowingly.",
      "The explanation to BNS Section 152 protects specified criticism seeking lawful alteration of governmental measures or action.",
      "Article 19 protects speech subject to the reasonable restrictions listed in Article 19(2).",
      "The BNS applies from 1 July 2024; Article 20(1) bars retrospective criminalisation or enhanced punishment.",
      "Conspiracy, preparation, concealment, attempt, abetment and completed waging of war are distinct stages requiring separate proof.",
      "Digital evidence, financial evidence and alleged speech must be authenticated and assessed in their complete context.",
      "Every answer should identify the exact statutory ingredient instead of relying on broad labels such as anti-national or sedition.",
      "IPC Sections 125–127 correspond to BNS Sections 153–155; the BNS refers to a foreign State at peace with India.",
      "IPC Sections 128–130 correspond to BNS Sections 156–158; distinguish voluntary permission, negligence and knowing assistance.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Section 121",
      "Indian Penal Code, 1860 — Section 121A",
      "Indian Penal Code, 1860 — Section 122",
      "Indian Penal Code, 1860 — Section 123",
      "Indian Penal Code, 1860 — Section 124",
      "Indian Penal Code, 1860 — Section 124A (historical)",
      "Indian Penal Code, 1860 — Sections 125–130",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 147–158",
      "Constitution of India — Articles 19(1)(a), 19(2) and 20(1)",
    ],
    examFocus:
      "Fix the date of conduct before selecting the IPC or BNS. For Sections 121–124A, distinguish conspiracy, preparation, concealment, coercion and completed war; compare historical IPC Section 124A with BNS Section 152 without treating them as identical. For Sections 125–127, identify the foreign State, depredation or knowing receipt. For Sections 128–130, distinguish voluntary release, negligent escape and knowing rescue or harbouring. Apply the relevant constitutional protections to speech and retrospective punishment.",
  },
  {
    title: "Offences against Public Tranquillity",
    shortDescription:
      "Study IPC Sections 141–160 and BNS Sections 189–197: unlawful assembly, riots, group enmity, affray and related public-order offences.",
    overview:
      "IPC Chapter VIII, Of Offences Against the Public Tranquillity, covers Sections 141–160, including Sections 153A, 153AA and 153B. BNS Chapter XI consolidates the corresponding subjects in Sections 189–197. This chapter explains prohibited common objects, intentional membership, common-object liability, rioting and dispersal; provocation, landholder duties, group enmity, public-servant protection and affray. It identifies changes in grouping, penalties and electronic-communication provisions, while distinguishing protected peaceful assembly from criminal conduct.",
    learningObjectives: [
      "Define an unlawful assembly and identify each statutory common object.",
      "Explain how a lawful assembly may subsequently become unlawful.",
      "Determine when joining or continuing in an assembly amounts to intentional membership.",
      "Distinguish common object under IPC Section 149 and BNS Section 190 from common intention and criminal conspiracy.",
      "Apply constructive liability to offences committed in prosecution of a common object or known to be likely.",
      "Explain the ingredients of rioting and armed rioting.",
      "Analyse liability after a lawful command to disperse.",
      "Explain liability for hiring, engaging, harbouring or going armed for an unlawful assembly.",
      "Distinguish unlawful assembly and rioting from affray and peaceful protest.",
      "Map IPC Sections 141–160, including 153A and 153B, to BNS Sections 189–197 without assuming identical numbering or penalties.",
      "Explain landholder liability under IPC Sections 154–156 and BNS Section 193.",
      "Identify the scope of IPC Section 153AA and explain why BNS Chapter XI has no separately numbered direct equivalent.",
    ],
    detailedContent: `1. Meaning and Purpose of Public Tranquillity

Public tranquillity means the condition of collective peace in which people can exercise rights and public authorities can perform lawful functions without group violence, intimidation or disorder. These offences address the special danger created when several persons combine around a prohibited common object.

The mere presence of a crowd is not criminal. The law requires the prescribed number of persons, a statutorily prohibited common object, knowledge of facts making the assembly unlawful, or other ingredients of the specific offence. Peaceful assembly remains protected by Article 19(1)(b), subject to reasonable restrictions under Article 19(3).

2. Unlawful Assembly under IPC Section 141

An assembly of five or more persons is an unlawful assembly if its common object is:

(a) to overawe by criminal force or show of criminal force the Central or a State Government, Parliament, a State Legislature, or a public servant exercising lawful power;
(b) to resist the execution of any law or legal process;
(c) to commit mischief, criminal trespass or another offence;
(d) by criminal force or show of criminal force, to take or obtain possession of property, deprive a person of a right of way, water or another incorporeal right, or enforce a right or supposed right; or
(e) by criminal force or show of criminal force, to compel a person to do what that person is not legally bound to do, or omit what that person is legally entitled to do.

An assembly lawful at its beginning may subsequently become unlawful if its common object changes. Conversely, individual misconduct does not automatically establish that every person present shared a prohibited common object.

3. Common Object

Common object is the shared objective of the assembly. It may be formed before the members gather or develop suddenly at the scene. It need not be the product of a formal agreement.

The object is inferred from proved circumstances such as the nature of the assembly, words used, weapons carried, conduct, target, route, prior communications, division of roles and behaviour before, during and after the incident. Courts must avoid assuming a common object merely from proximity, family relationship or presence in a large crowd.

4. Membership under IPC Sections 142–145

Under IPC Section 142, a person becomes a member when, being aware of facts rendering the assembly unlawful, the person intentionally joins it or continues in it. Sections 143–145 prescribe punishment for membership, armed membership, and joining or remaining after the assembly has lawfully been commanded to disperse.

Knowledge and intentional participation are essential. A passer-by, victim, observer, person trapped at the location or one who has clearly withdrawn is not automatically a member. Presence may be strong evidence when combined with conduct, but it is not an irrebuttable rule.

5. BNS Section 189: Consolidated Unlawful-Assembly Rules

BNS Section 189 consolidates the definition of unlawful assembly, membership and several related IPC offences. It retains the requirement of five or more persons and substantially preserves the five prohibited common objects.

Its sub-sections address intentional membership; joining or continuing after a lawful command to disperse; armed membership; knowingly remaining in an assembly likely to disturb public peace after a command to disperse; hiring or promoting persons to join; harbouring hired persons; and being hired or going armed to assist the prohibited acts.

The consolidation means that an answer should identify the relevant sub-section, not cite Section 189 generally without stating the particular conduct.

6. Rioting under IPC Sections 146–148

Rioting occurs when force or violence is used by an unlawful assembly, or by any member of it, in prosecution of the common object. Every member of that unlawful assembly is then guilty of rioting under the statutory rule.

IPC Section 147 provides punishment for rioting. Section 148 provides enhanced punishment where the offender is armed with a deadly weapon or anything which, used as a weapon of offence, is likely to cause death.

An unlawful assembly can exist without rioting; rioting requires force or violence. A violent incident involving fewer than five persons may constitute other offences but cannot satisfy the five-person foundation of unlawful assembly on those facts alone.

7. Rioting under BNS Section 191

BNS Section 191 consolidates the definition and punishment of rioting. Sub-section (1) defines the offence; sub-section (2) provides imprisonment up to two years, fine, or both; and sub-section (3) provides imprisonment up to five years, fine, or both where the rioter is armed with a deadly weapon or an object likely to cause death when used as a weapon.

The BNS therefore places definition, ordinary punishment and armed-rioting punishment within one section while substantially retaining the underlying structure.

8. Constructive Liability under IPC Section 149

IPC Section 149 makes every member of an unlawful assembly guilty of an offence committed by any member where the offence is:

(a) committed in prosecution of the common object; or
(b) one which members knew to be likely to be committed in prosecution of that object.

This is a rule of constructive liability, but it is not unlimited group punishment. The prosecution must prove an unlawful assembly, the accused's membership at the relevant time, the common object, the offence committed by a member, and the required connection or likelihood and knowledge.

9. BNS Section 190

BNS Section 190 substantially carries forward the common-object rule. If an offence is committed by a member in prosecution of the common object, or is one the members knew to be likely in prosecution of it, every person who was a member at the time is guilty of that offence.

The provision does not require proof that each member performed the final physical act. It does require a reliable finding of membership and statutory connection. Liability must be assessed separately for each accused, particularly where a gathering is large or changes over time.

10. Common Object, Common Intention and Conspiracy

Common object requires an unlawful assembly of at least five persons and does not necessarily require a prior agreement. Common intention is a joint-liability principle connected with participation in a criminal act done in furtherance of a shared intention and does not require five persons.

Criminal conspiracy centres on an agreement between at least two persons to pursue the unlawful object or means. The same evidence may raise more than one doctrine, but their ingredients cannot be treated as interchangeable.

11. Liability for Hiring and Related Conduct

IPC Section 150 makes a person who hires, engages, employs, promotes or connives at hiring persons to join an unlawful assembly punishable as a member and, within the statutory rule, for offences committed in pursuance of that hiring.

IPC Sections 157–158 address harbouring hired persons and being hired or going armed. BNS Section 189 brings these forms of liability into its consolidated sub-sections. Proof must connect the accused's conduct to the unlawful assembly; ordinary employment or association is insufficient.

12. Assembly Ordered to Disperse

IPC Section 145 concerns joining or continuing in an unlawful assembly knowing that it has been commanded in the manner prescribed by law to disperse. IPC Section 151 addresses knowingly joining or continuing in an assembly of five or more persons likely to disturb public peace after it has lawfully been commanded to disperse.

BNS Section 189 separately reflects these situations. The prosecution must prove a lawful command, the accused's knowledge of it, continued or subsequent participation, and the character of the assembly. The legality and communication of the order are important factual questions.

13. Assaulting a Public Servant Suppressing a Riot

IPC Section 152 punishes assaulting, threatening to assault, obstructing, or attempting to obstruct a public servant who is endeavouring to disperse an unlawful assembly or suppress a riot or affray, and using or threatening criminal force against that public servant.

BNS Section 195(1) covers actual assault, obstruction or use of criminal force against a public servant performing this duty; it prescribes up to three years' imprisonment or a fine of at least ₹25,000, or both. Section 195(2) separately covers threatened assault or attempted obstruction or criminal force; it prescribes up to one year, fine, or both. The public servant must be acting in discharge of the relevant official duty.

14. Provocation, Landholder Duties and Affray

BNS Section 192 punishes malignant or wanton illegal provocation intended or known to be likely to cause rioting, with punishment depending on whether a riot occurs. Section 193 addresses specified failures of owners, occupiers, agents or managers to report, prevent, suppress or disperse an unlawful assembly or riot in the statutory circumstances.

BNS Section 194 defines affray as two or more persons fighting in a public place and thereby disturbing public peace. Unlike unlawful assembly, affray needs only two persons and does not require one of the five common objects. Unlike rioting, it need not arise from an unlawful assembly.

15. Public Harmony Provisions

BNS Sections 196 and 197 address promoting enmity between groups and assertions prejudicial to national integration. Their IPC antecedents lie principally in Sections 153A and 153B. The BNS expressly covers electronic communication, while Section 197(1)(d) also addresses specified false or misleading information jeopardising India's sovereignty, unity, integrity or security. These sections must be read according to their exact statutory ingredients.

These offences may involve speech and therefore require careful application of the statutory mental element, context, audience and constitutional protections. Mere unpopular opinion should not be equated with the prohibited promotion of enmity or disharmony.

16. Peaceful Protest and Constitutional Protection

Article 19(1)(a) protects speech and Article 19(1)(b) protects peaceful assembly without arms. These rights are subject to constitutionally permitted reasonable restrictions. A demonstration does not become an unlawful assembly merely because it criticises government or causes inconvenience.

The legal question is whether five or more persons share one of the prohibited common objects and whether the accused knowingly and intentionally joins or continues. Violence, weaponry, coercive purpose, refusal after a lawful dispersal command and conduct of individual participants must be analysed in context.

17. Evidence and Withdrawal

Membership and common object may be proved through direct or circumstantial evidence, including reliable video, location evidence, communications, weapons, injuries, slogans, conduct and identified roles. Digital evidence must be authenticated, and group identification must not replace individual proof.

A member may withdraw before the offence, but withdrawal must be real and communicated or manifested by clear conduct. Mere physical movement within the scene may not prove withdrawal. A person who joins later is assessed from the time of joining, not automatically from the assembly's beginning.

18. Method for Solving Problems

Use the following sequence:

(a) identify whether at least five persons formed the assembly;
(b) state the precise prohibited common object;
(c) determine when the object arose or changed;
(d) prove the accused's awareness and intentional membership;
(e) identify any lawful command to disperse and knowledge of it;
(f) determine whether force or violence made the offence rioting;
(g) identify weapons and the armed-rioting rule;
(h) for constructive liability, connect the offence to the common object or prove known likelihood;
(i) distinguish common object from common intention and conspiracy;
(j) examine withdrawal, late entry and individual roles;
(k) identify the precise IPC section or BNS section and sub-section; and
(l) apply constitutional protection to peaceful speech and assembly before reaching a reasoned conclusion.

19. Provocation to Riot: IPC Section 153 and BNS Section 192

Both provisions address malignant or wanton illegal provocation intended or known to be likely to cause rioting. Punishment depends on whether rioting follows the provocation: up to one year if it does, or up to six months if it does not, or fine or both. Identify the illegal provoking act, the required intent or knowledge, and the causal consequence.

20. Promoting Enmity: IPC Section 153A and BNS Section 196

These provisions address specified promotion of disharmony or enmity between protected groups, acts prejudicial to public harmony, and organised exercises or drills intended or known to involve violence against such groups. BNS Section 196(1)(a) expressly includes electronic communication. Offences in a place of worship or an assembly engaged in religious worship have an enhanced punishment provision in subsection (2). Examine the actual message or activity, group distinction, context and statutory elements; criticism alone is not enough.

21. Armed Processions: IPC Section 153AA

The attached IPC text includes Section 153AA on knowingly carrying arms in a procession or joining a mass drill or training with arms contrary to a public notice or order under the former CrPC Section 144A. BNS Chapter XI, Sections 189–197, does not contain a separately numbered provision matching that offence. Do not manufacture a one-to-one BNS counterpart: identify the jurisdiction and date of the act, the applicable public-order law and any valid order before discussing liability.

22. National Integration: IPC Section 153B and BNS Section 197

These provisions concern specified statements or imputations about the allegiance, citizenship rights or communal obligations of groups. BNS Section 197 adds an express electronic-communication mode and clause (1)(d), addressing false or misleading information that jeopardises India's sovereignty, unity, integrity or security. Both statutes provide a higher punishment for the specified offence committed in a place of worship or an assembly performing religious worship. Identify the precise clause and prove its elements rather than assuming all contentious speech is prohibited.

23. Landholders and Agents: IPC Sections 154–156 and BNS Section 193

These provisions cover specified duties of an owner or occupier of land, an interested person and that person's agent or manager when an unlawful assembly or riot occurs or is likely. BNS Section 193 consolidates the landholder and interested-person rules in subsections (1) and (2), and the agent or manager rule in subsection (3). Liability depends on statutory notice, knowledge or reason to believe, capacity to act and failure to use the lawful measures required; ownership alone is not sufficient.

24. Harbouring and Hiring for an Unlawful Assembly: IPC Sections 157–158 and BNS Section 189(7)–(9)

IPC Section 157 addresses knowingly harbouring or gathering persons hired to join an unlawful assembly. IPC Section 158 addresses being hired or offering to be hired to perform one of the unlawful-assembly objects, with a more serious armed form. The BNS brings these rules into Section 189(7), (8) and (9). Distinguish the organiser, the harbourer, the hired participant and a hired participant who goes armed.

25. Affray: IPC Sections 159–160 and BNS Section 194

Two or more persons commit affray when fighting in a public place disturbs public peace. Both IPC Section 159 and BNS Section 194(1) define the offence. IPC Section 160 and BNS Section 194(2) state punishment: imprisonment up to one month, fine, or both. The BNS maximum fine is ₹1,000, compared with ₹100 under the IPC text. Affray does not require five people or an unlawful common object.

26. Consolidated Revision Map

IPC 141–145 → BNS 189(1)–(5); IPC 146–148 → BNS 191(1)–(3); IPC 149 → BNS 190; IPC 150 → BNS 189(6); IPC 151 → BNS 189(5); IPC 152 → BNS 195; IPC 153 → BNS 192; IPC 153A → BNS 196; IPC 153AA has no separately numbered counterpart in BNS Chapter XI; IPC 153B → BNS 197; IPC 154–156 → BNS 193; IPC 157–158 → BNS 189(7)–(9); IPC 159–160 → BNS 194. Read the exact subsection and the law in force at the date of conduct.`,
    keyPoints: [
      "An unlawful assembly requires at least five persons sharing one of the statutorily prohibited common objects.",
      "A lawful assembly may subsequently become unlawful when its common object changes.",
      "Membership requires awareness of the relevant facts and intentional joining or continuation.",
      "Mere presence in a crowd does not automatically prove membership.",
      "Common object may develop suddenly and does not require a formal prior agreement.",
      "Rioting requires force or violence by an unlawful assembly or a member in prosecution of its common object.",
      "An unlawful assembly may exist without rioting, but rioting under these provisions rests on an unlawful assembly.",
      "Armed rioting attracts enhanced punishment under IPC Section 148 and BNS Section 191(3).",
      "Constructive liability applies only when the offence advances the common object or was known to be likely in its prosecution.",
      "Each accused's membership at the time of the offence must be established separately.",
      "Common object, common intention and criminal conspiracy have distinct ingredients.",
      "A lawful dispersal command and the accused's knowledge are essential to dispersal-related liability.",
      "BNS Section 189 consolidates the definition, membership and several hiring and dispersal offences.",
      "BNS Section 190 carries forward constructive common-object liability.",
      "BNS Section 191 consolidates rioting and armed-rioting rules.",
      "Affray requires fighting by two or more persons in a public place and disturbance of public peace.",
      "Peaceful protest is constitutionally protected and must not be presumed unlawful merely because it is critical or inconvenient.",
      "Every problem should identify number, common object, membership, force, weapon, dispersal order and statutory connection separately.",
      "IPC Sections 154–156 are consolidated in BNS Section 193, while IPC Sections 159–160 correspond to BNS Section 194.",
      "IPC Sections 153A and 153B correspond principally to BNS Sections 196 and 197, with express electronic-communication wording and an additional clause in BNS Section 197.",
      "BNS Section 191(3) increases the maximum term for armed rioting from three years under IPC Section 148 to five years.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Sections 141–160, including 153A and 153B",
      "Indian Penal Code, 1860 — Section 153AA (special armed-procession provision in the supplied text; no separately numbered BNS Chapter XI counterpart)",
      "Bharatiya Nyaya Sanhita, 2023 — Section 189",
      "Bharatiya Nyaya Sanhita, 2023 — Section 190",
      "Bharatiya Nyaya Sanhita, 2023 — Section 191",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 192–195",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 196–197 (public harmony and national integration)",
      "Constitution of India — Articles 19(1)(a), 19(1)(b), 19(2) and 19(3)",
    ],
    examFocus:
      "Start by identifying the date and exact offence. For assembly offences, prove five or more persons, a prohibited common object, intentional membership, and any violence, weapons or dispersal order. For IPC Sections 153A–153B and BNS Sections 196–197, identify the actual expression, relevant group, precise statutory clause and constitutional context. Compare IPC Sections 154–160 with their consolidated BNS counterparts; note the changed armed-rioting penalty and the absence of a separately numbered BNS Chapter XI counterpart to the supplied Section 153AA. Distinguish a peaceful protest from criminal conduct.",
  },
  {
    title: "False Evidence and Offences against Public Justice",
    shortDescription:
      "A detailed study of giving and fabricating false evidence, aggravated forms, threats to witnesses, false certificates and declarations, and their effect on public justice.",
    overview:
      "The administration of justice depends upon truthful testimony and reliable documentary, electronic and circumstantial evidence. This chapter examines IPC Sections 191–200 and their principal counterparts in BNS Sections 227–237. It distinguishes giving false evidence from fabricating it, explains the legal duty to speak the truth, materiality and the required mental state, compares punishment in judicial and other proceedings, and analyses aggravated liability where false evidence is intended to procure conviction for a grave offence. It also covers witness intimidation, corrupt use of evidence known to be false, false certificates and declarations, and a practical method for solving problems involving testimony, records and electronic evidence.",
    learningObjectives: [
      "Define giving false evidence and identify the legal duty, false statement and required mental state.",
      "Distinguish an objectively incorrect statement from criminal false evidence.",
      "Explain fabrication through artificial circumstances, false entries, documents and electronic records.",
      "Identify the additional intention and materiality requirements for fabricated evidence.",
      "Compare punishment for false evidence in judicial and non-judicial proceedings.",
      "Analyse aggravated liability intended to procure conviction for capital or other serious offences.",
      "Explain liability for threatening a person to give false evidence.",
      "Apply the offences relating to use of evidence, certificates and declarations known to be false.",
      "Compare IPC Sections 191–200 with BNS Sections 227–237.",
      "Evaluate oral, documentary and electronic evidence through an ingredient-based problem method.",
    ],
    detailedContent: `1. Public Justice and the Need for Truthful Evidence

Courts, tribunals, arbitrators and public authorities make decisions from evidence placed before them. Deliberately corrupting that material can convict an innocent person, defeat a lawful claim, protect an offender or undermine confidence in legal institutions. False-evidence offences therefore protect the decision-making process rather than merely the private interests of one party.

Not every error, inconsistency or failed recollection is criminal. The law requires a legal duty to state the truth or a deliberate act of fabrication, the prescribed knowledge or belief, and any additional statutory intention or material connection.

2. Giving False Evidence under IPC Section 191

A person gives false evidence when, being legally bound by an oath or an express provision of law to state the truth, or being legally bound to make a declaration upon a subject, that person makes a statement which is false and which the person knows or believes to be false or does not believe to be true.

The statement may be verbal or otherwise. A statement about the speaker's belief may itself be false: a person who claims to believe something that the person does not actually believe may give false evidence even if the underlying fact later proves true.

3. BNS Section 227

BNS Section 227 substantially carries forward the definition of giving false evidence. The essential questions remain:

(a) was the person legally bound to state the truth or make the declaration;
(b) was a statement made;
(c) was the statement false; and
(d) did the person know or believe it was false, or not believe it to be true?

An interpreter or translator legally bound to interpret truly may commit the offence by deliberately giving a translation not believed to be true. A good-faith statement of genuine belief is not false evidence merely because that belief is factually mistaken.

4. Legal Duty and the Mental Element

The duty to speak truthfully may arise from an oath, statutory obligation or legally required declaration. A casual lie outside such a duty may be immoral and may constitute another offence, but it does not automatically satisfy the false-evidence definition.

Knowledge, belief and absence of belief must be proved from the circumstances. Negligence, confusion, poor memory, misunderstanding a question or an innocent mistake is not enough. Deliberate evasiveness may be relevant, but the prosecution must identify the statement alleged to be false and establish the accused's state of mind.

5. Contradictions and Hostile Testimony

Two inconsistent statements do not automatically prove which one is false or that either was made with the statutory mental state. The surrounding evidence must establish falsity and conscious departure from truth.

A witness being declared hostile is an evidentiary event, not a conviction for false evidence. A court may accept reliable portions of testimony while rejecting others. Criminal liability requires an independent application of the statutory ingredients and applicable procedural safeguards.

6. Fabricating False Evidence under IPC Section 192

A person fabricates false evidence by causing a circumstance to exist, making a false entry in a book or record, or making a document or electronic record containing a false statement, with the required intention that it appear in evidence in a judicial proceeding or a proceeding taken by law before a public servant or arbitrator.

The person must also intend that the artificial circumstance, entry or statement cause the decision-maker to entertain an erroneous opinion on a point material to the result. Planting an object, manufacturing a record or creating a false digital trail can therefore constitute fabrication when these elements are proved.

7. BNS Section 228

BNS Section 228 substantially retains the fabrication rule and expressly refers to books, records, electronic records, documents and electronic records containing false statements. Fabrication can occur before proceedings begin if the evidence is created with the required intended use.

The offence differs from giving false evidence. Giving false evidence centres on a false statement made while legally bound to speak truthfully. Fabrication centres on intentionally creating a false circumstance or evidentiary item designed to mislead a legally authorised decision-maker on a material point.

8. Materiality and Intended Use

For fabrication, the erroneous opinion intended must concern a point material to the result of the proceeding. Materiality is assessed in relation to the issues the authority must decide; a wholly irrelevant false detail will not satisfy this element merely because it is untrue.

Actual admission or successful deception is not always necessary where the offence is defined by the creation of false evidence with the prescribed intention. The prosecution must nevertheless prove the contemplated proceeding or legally authorised process and the intended evidentiary effect.

9. Punishment under IPC Section 193 and BNS Section 229

The law distinguishes false evidence in a stage of a judicial proceeding from false evidence in other cases. Under BNS Section 229, intentional giving or fabrication in a judicial proceeding, or fabrication for use in such a proceeding, may be punished with imprisonment up to seven years and fine up to ten thousand rupees.

In other cases covered by the section, punishment may extend to three years and fine up to five thousand rupees. IPC Section 193 follows the corresponding distinction, although a transition answer should state the applicable statutory wording and date rather than assume all fine provisions are identical.

10. Meaning of a Stage of Judicial Proceeding

The statutory explanation extends the concept beyond testimony delivered inside a courtroom. An investigation directed by law preliminary to a judicial proceeding, and conducted by a public servant authorised by law, may form a stage of a judicial proceeding. Proceedings must be classified from their legal character, not their physical location.

The answer should identify the authority, source of power, nature of the inquiry, purpose of the evidence and whether the evidence was given in or fabricated for the legally recognised stage.

11. False Evidence to Procure Conviction for a Capital Offence

IPC Section 194 and BNS Section 230 create aggravated liability where a person gives or fabricates false evidence intending, or knowing it to be likely, to cause another person to be convicted of an offence punishable with death.

The provision imposes severe punishment and further addresses the consequence where an innocent person is convicted and executed because of that false evidence. The prosecution must prove the accused's special intention or knowledge, the nature of the target offence and, for consequence-based punishment, the required causal result.

12. False Evidence Concerning Other Serious Offences

IPC Section 195 and BNS Section 231 address false evidence intended or known to be likely to procure conviction for an offence punishable with imprisonment for life or the specified serious term of imprisonment. The punishment is linked to the punishment that could be imposed for the target offence within the statutory rule.

A careful answer identifies the exact offence for which conviction was sought, its lawful punishment, the accused's intention or knowledge, and whether the false evidence was capable of producing that result.

13. Threatening a Person to Give False Evidence

IPC Section 195A and BNS Section 232 punish threats of injury to a person's body, reputation or property, or to the body or reputation of a person in whom that person is interested, when made with intent to cause the person to give false evidence.

BNS Section 232 also provides consequence-based liability where an innocent person is convicted and severely sentenced because of false evidence induced by the threat. The offence protects witness autonomy as well as the accuracy of adjudication. The threat, target, intended influence and resulting evidence must be proved separately.

14. Using Evidence Known to Be False

IPC Section 196 and BNS Section 233 punish a person who corruptly uses or attempts to use as true or genuine evidence which that person knows to be false or fabricated. The user need not have personally created the evidence.

The prosecution must prove the use or attempt, corrupt character and actual knowledge. Mere reliance on evidence later found unreliable is insufficient where the user honestly believed it to be genuine.

15. False Certificates

IPC Section 197 and BNS Section 234 address issuing or signing a certificate required by law to be given or signed, or relating to a fact for which the certificate is legally admissible in evidence, where the certificate is false in a material point and the maker knows or believes it to be false.

IPC Section 198 and BNS Section 235 punish corrupt use or attempted use of such a certificate as true while knowing it to be materially false. Medical, official, educational or other certificates fall within the provision only when the statutory legal-use conditions are satisfied.

16. False Declarations

IPC Section 199 and BNS Section 236 apply to a declaration which a court, public servant or other person is legally bound or authorised to receive as evidence of a fact. A materially false statement made in such a declaration with knowledge, belief in falsity or absence of belief in truth is punished as false evidence.

IPC Section 200 and BNS Section 237 punish corrupt use or attempted use of such a declaration as true, knowing it to be false in a material point. A declaration does not fall outside the provision merely because a technical informality affects admissibility, subject to the statutory explanation.

17. Electronic and Digital Evidence

False entries, altered metadata, fabricated messages, edited recordings, synthetic media, manipulated logs and forged electronic records may engage these offences when the required creation, intended use, materiality and mental state are proved.

Digital evidence must be authenticated and preserved with a reliable chain of custody. Investigators and courts should distinguish original data, copies, automated records, user-generated content and later alteration. Technical proof of manipulation must be connected to the accused and to the intended legal proceeding.

18. Procedure and Safeguards

False-evidence prosecutions connected with court proceedings are subject to procedural requirements designed to prevent retaliatory or casually initiated cases. The court ordinarily considers whether action is legally permissible and expedient in the interests of justice under the applicable procedural law.

These safeguards do not reduce the seriousness of deliberate perjury or fabrication. They ensure that prosecution follows the authorised route, is based on material falsehood and is not used merely because testimony was disbelieved or a party lost the case.

19. Date of Conduct and IPC-to-BNS Transition

The BNS came into force on 1 July 2024. Pre-commencement conduct is assessed under the IPC and applicable savings provisions; later conduct is assessed under the BNS. Article 20(1) prevents retrospective criminalisation or enhancement of punishment.

BNS Sections 227–237 substantially reorganise IPC Sections 191–200 and the inserted witness-threat provision in Section 195A. Students should compare ingredients and punishments rather than relying on a mechanical numbering table.

20. Method for Solving Problems

Use the following sequence:

(a) identify the exact statement, circumstance, entry, document or electronic record;
(b) determine whether the allegation is giving or fabricating false evidence;
(c) establish the legal duty, proceeding and competent authority;
(d) prove objective falsity and the accused's knowledge, belief or absence of genuine belief;
(e) for fabrication, prove intended evidentiary use and materiality;
(f) classify the proceeding as judicial or otherwise;
(g) identify any intention to procure conviction for a grave offence;
(h) examine threats, use, certificates or declarations under their separate provisions;
(i) establish causation for any aggravated consequence;
(j) authenticate documentary and electronic evidence;
(k) apply procedural safeguards and the law governing the date of conduct; and
(l) reach a separate reasoned conclusion for each alleged act and accused person.`,
    keyPoints: [
      "False-evidence offences protect the integrity of legally authorised decision-making.",
      "A factual error is not automatically criminal; the prescribed mental element must be proved.",
      "Giving false evidence requires a legal duty to state the truth or make the declaration.",
      "A statement about belief may be false where the speaker does not genuinely hold that belief.",
      "Fabrication involves creating a circumstance, entry, document or electronic record intended to mislead on a material point.",
      "Giving false evidence and fabricating false evidence are distinct offences with different act requirements.",
      "Materiality is assessed against the issues relevant to the result of the proceeding.",
      "Judicial-proceeding false evidence attracts a more serious punishment category.",
      "Aggravated liability applies when false evidence is intended or known likely to procure conviction for specified grave offences.",
      "Threatening a person to give false evidence is independently punishable.",
      "A person may be liable for corruptly using false evidence even without having fabricated it.",
      "False-certificate offences require a certificate legally required or admissible in evidence and falsity on a material point.",
      "False-declaration offences require a declaration legally receivable as evidence of a fact.",
      "Contradictory or hostile testimony does not by itself prove criminal false evidence.",
      "Electronic fabrication requires authentication, attribution, intended legal use and proof of the mental element.",
      "Procedural safeguards prevent false-evidence prosecution from becoming a routine response to rejected testimony.",
      "BNS Sections 227–237 reorganise the central IPC false-evidence provisions.",
      "The date of conduct determines whether the IPC or BNS applies.",
      "Every answer should separate falsity, duty, knowledge, materiality, intended use, proceeding and consequence.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Sections 191–193",
      "Indian Penal Code, 1860 — Sections 194–195A",
      "Indian Penal Code, 1860 — Sections 196–200",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 227–229",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 230–232",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 233–237",
      "Constitution of India — Article 20(1)",
    ],
    examFocus:
      "Identify whether the conduct is giving false evidence, fabrication, threat, use, certificate or declaration. Prove the legal duty and mental element, then address materiality, intended evidentiary use, classification of the proceeding and any aggravated intention or consequence. Comparative answers should map IPC Sections 191–200 and 195A to BNS Sections 227–237 while noting the applicable date and any punishment differences.",
  },
  {
    title: "Offences against the Human Body",
    shortDescription:
      "A detailed study of homicide, suicide-related offences, hurt, restraint, confinement, force, assault, kidnapping, abduction and sexual offences under the IPC-to-BNS transition.",
    overview:
      "Offences against the human body protect life, bodily integrity, liberty and sexual autonomy. This chapter studies the syllabus range of IPC Sections 299–377 and explains its substantial reorganisation under the Bharatiya Nyaya Sanhita, 2023. Homicide, hurt, wrongful restraint and confinement, criminal force, assault, kidnapping and abduction are principally located in BNS Sections 100–146, while sexual offences are primarily organised in BNS Sections 63–99. The chapter distinguishes culpable homicide from murder, intention from knowledge and negligence, hurt from grievous hurt, restraint from confinement, force from assault, and kidnapping from abduction. It also explains consent, sexual-offence structure, attempts, causation, group liability and the importance of applying the statute in force on the date of conduct.",
    learningObjectives: [
      "Distinguish culpable homicide, murder and causing death by negligence.",
      "Apply the four murder clauses and five statutory exceptions to murder.",
      "Analyse causation, intention, knowledge and transferred liability in homicide problems.",
      "Explain abetment of suicide and distinguish it from attempt-related offences.",
      "Differentiate hurt, grievous hurt and aggravated forms involving weapons, victims or purposes.",
      "Distinguish wrongful restraint from wrongful confinement.",
      "Explain force, criminal force and assault and identify their aggravated forms.",
      "Distinguish kidnapping from lawful guardianship, kidnapping from India and abduction.",
      "Explain the statutory ingredients of rape, consent and major aggravated sexual offences.",
      "Map the IPC syllabus to the reorganised BNS provisions without assuming a mechanical one-to-one correspondence.",
    ],
    detailedContent: `1. Protected Interests and Statutory Structure

This group of offences protects human life, physical and mental integrity, freedom of movement and sexual autonomy. The IPC historically placed the principal provisions in Sections 299–377. The BNS reorganises them: sexual offences against women and children appear mainly in Chapter V, Sections 63–99, while offences affecting life, hurt, liberty, force, kidnapping, trafficking and related conduct appear mainly in Chapter VI, Sections 100–146.

The reorganisation makes concept-based learning essential. The date of conduct must be fixed first, followed by the applicable statute, precise offence, definitions, exceptions and punishment provision.

2. Culpable Homicide

IPC Section 299 and BNS Section 100 define culpable homicide. A person commits culpable homicide by causing death through an act done:

(a) with the intention of causing death;
(b) with the intention of causing bodily injury likely to cause death; or
(c) with knowledge that the act is likely to cause death.

The prosecution must prove death, causation and one of these mental states. Intention generally represents a conscious objective, while knowledge concerns awareness of the likely consequence. The distinction influences whether the offence is murder or culpable homicide not amounting to murder.

3. Causation in Homicide

The accused's conduct must be a legally relevant cause of death. A victim's physical weakness, disease or vulnerability does not ordinarily break causation merely because a healthier person might have survived. Nor is causation necessarily broken because prompt or skilful treatment could have prevented death.

An independent, unforeseeable intervening event may require separate analysis. Medical evidence assists the court, but legal causation is determined from the entire chain of conduct, injury, treatment and death.

4. Murder

IPC Section 300 and BNS Section 101 provide that culpable homicide is murder, subject to the statutory exceptions, where the act causing death falls within one of four principal categories:

(a) intention to cause death;
(b) intention to cause bodily injury known by the offender to be likely to cause that particular person's death;
(c) intention to cause bodily injury which is sufficient in the ordinary course of nature to cause death; or
(d) knowledge that the act is so imminently dangerous that it must in all probability cause death or such bodily injury, and doing it without excuse for incurring that risk.

The clauses must be applied separately. Premeditation is relevant evidence but is not an ingredient of every form of murder.

5. Exceptions to Murder

The five principal exceptions retained in BNS Section 101 concern:

(a) grave and sudden provocation, subject to its provisos;
(b) exceeding private defence in good faith without premeditation and without intending more harm than necessary;
(c) a public servant or person assisting one who exceeds lawful power in good faith for advancement of public justice, without ill-will;
(d) sudden fight without premeditation, in the heat of passion upon a sudden quarrel, without undue advantage or cruel or unusual conduct; and
(e) death or risk of death suffered with the consent of a person above eighteen years.

An exception reduces murder to culpable homicide not amounting to murder; it does not automatically make the killing lawful. Each condition and exclusion must be proved from the facts.

6. Punishment for Homicide

Under the BNS, punishment for murder is principally in Section 103, while culpable homicide not amounting to murder is punished under Section 105. BNS Section 104 separately addresses murder by a person under sentence of imprisonment for life.

IPC punishment provisions lie principally in Sections 302 and 304. A complete answer first classifies the homicide under the definition and exceptions and only then cites the punishment provision.

7. Causing Death by Negligence

IPC Section 304A and BNS Section 106 apply where death results from a rash or negligent act not amounting to culpable homicide. Criminal negligence requires a legally blameworthy departure from the required standard, not merely an unfortunate result or ordinary civil negligence.

BNS Section 106 contains differentiated rules, including specified treatment of registered medical practitioners performing medical procedures and a distinct provision concerning rash and negligent driving followed by escape without reporting. Application requires attention to the text in force and any commencement or judicial developments relevant to the alleged date.

8. Dowry Death and Organised Group Murder

IPC Section 304B and BNS Section 80 address dowry death through special ingredients involving the death of a woman within the statutory period after marriage, otherwise than under normal circumstances, and dowry-related cruelty or harassment soon before death.

BNS Section 103(2) separately addresses murder committed by a group of five or more persons acting in concert on specified identity-related grounds. These provisions should not be merged with ordinary murder analysis; their special ingredients and evidentiary rules must be proved.

9. Abetment of Suicide

IPC Sections 305–306 and BNS Sections 107–108 address abetment of suicide, with a special aggravated provision for a child, person of unsound mind, delirious person or person in a state of intoxication.

Suicide alone does not prove abetment. The prosecution must establish instigation, conspiracy accompanied by the required act or illegal omission, or intentional aid, together with a sufficiently proximate link to the suicide. Ordinary disagreement, criticism or strained relations cannot automatically substitute for the statutory act and mental element.

10. Attempt to Murder and Related Attempts

IPC Section 307 and BNS Section 109 punish an act done with such intention or knowledge and under such circumstances that, if death were caused, the act would amount to murder. Actual injury is not necessary for the basic attempt, although injury may affect punishment.

IPC Section 308 and BNS Section 110 similarly concern attempt to commit culpable homicide not amounting to murder. The distinction depends on the hypothetical liability had death occurred, assessed from intention, knowledge, circumstances, weapon, target, force, injury and surrounding conduct.

11. Hurt and Voluntarily Causing Hurt

IPC Section 319 and BNS Section 114 define hurt as causing bodily pain, disease or infirmity. IPC Sections 321 and 323 and BNS Section 115 address voluntarily causing hurt through the required intention or knowledge.

Physical injury visible to the eye is not always necessary; bodily pain, disease or infirmity may suffice. The prosecution must still prove causation and the applicable mental state.

12. Grievous Hurt

IPC Section 320 and BNS Section 116 enumerate grievous hurt categories, including emasculation; permanent loss of sight or hearing; privation or permanent impairment of a member or joint; permanent disfiguration of head or face; fracture or dislocation of bone or tooth; and hurt endangering life or causing the specified period of severe bodily pain or inability to follow ordinary pursuits.

The injury must fall within a statutory category. The seriousness of pain alone does not permit a court to invent an additional category. Medical evidence should address the exact clause alleged.

13. Aggravated Hurt Offences

BNS Sections 117–125 address voluntarily causing grievous hurt, hurt or grievous hurt by dangerous weapons or means, hurt to extort property or confession, hurt to deter a public servant, poison-related hurt, acid attacks and acts endangering life or personal safety. Their IPC antecedents were distributed principally across Sections 322–338.

Each aggravated offence adds a circumstance, purpose, victim category, means or consequence. A correct charge cannot rest merely on proof of basic hurt.

14. Wrongful Restraint and Wrongful Confinement

Wrongful restraint prevents a person from proceeding in a direction in which that person has a right to proceed. Wrongful confinement totally restrains a person within circumscribed limits.

IPC Sections 339–348 contain definitions, punishment and aggravated forms. BNS Sections 126–127 consolidate these rules. Confinement is an aggravated species of restraint; the key distinction is partial obstruction of movement versus complete restriction within boundaries.

15. Force, Criminal Force and Assault

IPC Sections 349–351 correspond principally to BNS Sections 128–130. Force concerns causing motion, change of motion or cessation of motion in the statutorily described manner. Criminal force requires intentional use of force without consent to commit an offence or with the prescribed intention or knowledge of injury, fear or annoyance.

Assault occurs through a gesture or preparation causing a person present to apprehend imminent use of criminal force. Physical contact is not necessary for assault, while criminal force requires force. Mere words do not by themselves constitute assault, though words may give meaning to gestures or preparations.

16. Punishment and Aggravated Assault

BNS Sections 131–136 address punishment for assault or criminal force and aggravated forms involving public servants, intent to dishonour, attempted wrongful confinement and grave provocation. IPC antecedents lie principally in Sections 352–358.

The prosecution should identify consent, intention or knowledge, apprehension of imminence, actual force, victim status and the aggravating purpose. Separate sexual offences involving assault against women are principally located in BNS Sections 74–79.

17. Kidnapping

IPC Section 359 recognises kidnapping from India and kidnapping from lawful guardianship. BNS Section 137 consolidates these forms. Kidnapping from India concerns conveying a person beyond India without legally valid consent. Kidnapping from lawful guardianship concerns taking or enticing a child or person of unsound mind out of the keeping of a lawful guardian without the guardian's consent, subject to the statutory exception.

Kidnapping is complete upon the prohibited taking or enticing. The child's willingness does not replace the guardian's legally relevant consent where the provision applies.

18. Abduction

IPC Section 362 and BNS Section 138 define abduction through compelling a person by force, or inducing a person by deceitful means, to go from any place. Abduction by itself is generally not punishable unless accompanied by a prohibited purpose under another provision.

Unlike kidnapping from lawful guardianship, abduction can concern a person of any age, requires force or deceitful inducement, and may continue as the person is moved. The exact purpose—such as murder, secret confinement, forced marriage or exploitation—determines the substantive offence.

19. Aggravated Kidnapping, Trafficking and Exploitation

BNS Sections 139–146 cover kidnapping or maiming a child for begging, kidnapping or abduction for murder or ransom, importation, concealment, trafficking, exploitation of a trafficked person and habitual dealing in slaves. IPC antecedents were spread mainly across Sections 363–374.

These offences have distinct victim, purpose, conduct and knowledge requirements. Trafficking should be analysed from recruitment, transport, harbouring, transfer or receipt, the prohibited means and the purpose of exploitation under the statutory definition.

20. Rape under IPC and BNS

IPC Section 375 historically defined rape and Section 376 and its sub-sections prescribed punishment and aggravated forms. BNS Section 63 defines rape and Sections 64–71 contain punishment and specified aggravated situations, gang rape, repeat offending and related rules.

The offence is defined through specified acts and legally relevant circumstances, including acts against will, without consent, consent affected by fear or misconception in the stated circumstances, incapacity to understand, statutory age, and inability to communicate consent. Penetration to the statutory extent is sufficient; completion does not require emission.

21. Consent and Sexual Autonomy

BNS Section 63 explains consent as an unequivocal voluntary agreement communicated by words, gestures or verbal or non-verbal communication to participate in the specific sexual act. Absence of physical resistance alone does not constitute consent.

Consent must relate to the specific act and be legally valid at the relevant time. Submission caused by fear is not necessarily consent. The statutory age rule operates regardless of factual agreement. Evidence must be assessed without stereotypes about expected behaviour, delay, clothing, prior relationship or resistance.

22. Aggravated Sexual Offences

BNS Sections 64–71 address punishment for rape, rape in specified aggravated circumstances, intercourse by husband during separation, intercourse by a person in authority, intercourse by deceitful means or false promise within Section 69, gang rape and repeat offenders. Sections 72–73 protect the identity of victims and regulate publication concerning proceedings.

Sections 74–79 address assault or criminal force to outrage modesty, sexual harassment, disrobing, voyeurism, stalking and words or gestures insulting modesty. Sexual offences against children must also be analysed under the Protection of Children from Sexual Offences Act, 2012 where applicable.

23. Marital Exception and Statutory Limits

The statutory rape definition retains an exception for sexual acts by a man with his own wife where the wife is not under eighteen years of age, while BNS Section 67 separately addresses specified intercourse by a husband during separation. The legal and constitutional treatment of marital sexual violence is a developing and sensitive area; answers must state the enacted text, relevant binding decisions and current legal position without converting policy debate into statutory language.

24. Historical IPC Section 377 and the BNS Transition

IPC Section 377 historically addressed specified sexual acts described as against the order of nature. Its application to consensual sexual conduct between adults in private was constitutionally read down before the IPC was replaced.

The BNS does not reproduce IPC Section 377 as a directly equivalent standalone provision. Conduct involving children, lack of consent, assault, hurt, trafficking or other prohibited circumstances may engage other BNS provisions or special laws, but a comparison must not invent an equivalent section where Parliament has not enacted one.

25. Evidence, Medical Examination and Victim Dignity

Medical evidence may corroborate injuries, timing, biological material or other facts, but absence of injury does not by itself disprove a sexual offence or assault. Consent is a legal and factual question, not a medical diagnosis.

Investigations and trials must protect privacy, identity and dignity. Electronic communications, location data and recordings require authentication and contextual interpretation. Character assumptions cannot replace proof of consent or the accused's statutory mental element.

26. Method for Solving Problems

Use the following sequence:

(a) fix the date and applicable IPC or BNS provision;
(b) identify the protected interest, conduct, circumstance and consequence;
(c) prove causation where injury or death is required;
(d) identify intention, knowledge, rashness or negligence precisely;
(e) for homicide, apply culpable homicide first, then murder clauses and exceptions;
(f) classify hurt under the exact statutory category and aggravation;
(g) distinguish restraint from confinement and assault from criminal force;
(h) distinguish kidnapping from abduction and identify any prohibited purpose;
(i) for sexual offences, identify the specified act and legally relevant consent circumstance;
(j) consider age, authority, relationship, group conduct and special legislation;
(k) authenticate medical, documentary and electronic evidence; and
(l) reach a separate reasoned conclusion on the definition, exception and punishment provision.`,
    keyPoints: [
      "Culpable homicide is the genus and murder is its aggravated species, subject to statutory exceptions.",
      "Homicide requires proof of death, legal causation and the prescribed intention or knowledge.",
      "The four murder clauses and five exceptions must be applied separately.",
      "Causing death by negligence applies only where the conduct does not amount to culpable homicide.",
      "Suicide alone does not prove abetment; instigation, qualifying conspiracy or intentional aid must be established.",
      "Attempt liability is assessed from the intention, knowledge, circumstances and act done, even if death does not result.",
      "Hurt includes bodily pain, disease or infirmity.",
      "Grievous hurt must fall within an enumerated statutory category.",
      "Wrongful restraint partially obstructs lawful movement; wrongful confinement totally restricts movement within limits.",
      "Assault creates apprehension of imminent criminal force; criminal force requires actual force.",
      "Kidnapping and abduction have different age, consent, means and continuity requirements.",
      "Abduction ordinarily becomes punishable when connected to a specified unlawful purpose.",
      "Sexual offences are mainly in BNS Sections 63–99, separate from the BNS human-body chapter.",
      "Consent means unequivocal voluntary agreement to the specific sexual act; absence of resistance alone is not consent.",
      "Statutory age rules operate independently of factual willingness.",
      "Medical injury is not an indispensable condition for proving every sexual offence.",
      "BNS Sections 100–146 principally cover homicide, hurt, liberty, assault, kidnapping and trafficking.",
      "The BNS does not contain a directly equivalent standalone reproduction of IPC Section 377.",
      "The date of conduct controls whether the IPC or BNS applies under Article 20(1).",
      "Every answer should separate definition, exception, aggravation and punishment provisions.",
    ],
    provisions: [
      "Indian Penal Code, 1860 — Sections 299–311",
      "Indian Penal Code, 1860 — Sections 319–338",
      "Indian Penal Code, 1860 — Sections 339–358",
      "Indian Penal Code, 1860 — Sections 359–377",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 63–99",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 100–113",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 114–136",
      "Bharatiya Nyaya Sanhita, 2023 — Sections 137–146",
      "Protection of Children from Sexual Offences Act, 2012 — relevant provisions",
      "Constitution of India — Articles 14, 15, 19, 20(1) and 21",
    ],
    examFocus:
      "For homicide, establish culpable homicide, test the murder clauses, apply each claimed exception and then select punishment. For bodily injury and liberty offences, classify the exact conduct and aggravation. For kidnapping and sexual offences, identify age, consent, means, purpose and special-law overlap. Comparative answers must explain that BNS Sections 63–99 and 100–146 reorganise the IPC syllabus and must not assume every IPC provision, particularly Section 377, has a direct BNS equivalent.",
  },

];

const existingCriminalLawIChapters = units.map(
  (unit, index) =>
    createChapterModel({
      id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-${index + 1}`,
      courseId: CRIMINAL_LAW_I_COURSE_ID,
      title:
        index === 0
          ? "CHAPTER I  INTRODUCTION"
          : index === 1
            ? "CHAPTER II  GENERAL EXPLANATIONS"
            : index === 2
              ? "CHAPTER III  OF PUNISHMENTS"
            : index === 3
              ? "CHAPTER IV  GENERAL EXCEPTIONS"
            : index === 4
              ? "CHAPTER V  OF ABETMENT"
            : index === 5
              ? "CHAPTER VA  CRIMINAL CONSPIRACY"
            : index === 6
              ? "CHAPTER VII  OF OFFENCES RELATING TO THE ARMY, NAVY AND AIR FORCE"
          : unit.title,
      slug: `unit-${index + 1}-${unit.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")}`,
      shortDescription:
        index === 0
          ? "Read the supplied IPC preamble and Sections 1-5, both explanations and the Uganda illustration, with BNS comparisons, study notes, practice questions and an indexed PDF."
          : index === 1
            ? "Understand the definitions, interpretive rules and joint-liability principles in IPC Sections 6–52A and their consolidation in BNS Sections 2–3."
            : index === 2
              ? "Study punishments, commutation, fines, solitary confinement and enhanced sentences under IPC Sections 53–75 and BNS Sections 4–13."
            : index === 3
              ? "Study mistake, accident, capacity, consent, compulsion and private defence under IPC Sections 76–106 and BNS Sections 14–44."
            : index === 4
              ? "Study instigation, conspiracy-based abetment, intentional aid and consequential liability under IPC Sections 107–120 and BNS Sections 45–60."
            : index === 5
              ? "Study the agreement, overt-act rule and punishment governing criminal conspiracy under IPC Sections 120A–120B and BNS Section 61."
            : index === 6
              ? "Study mutiny, desertion, insubordination and military impersonation under IPC Sections 131–140 and BNS Sections 159–168."
          : unit.shortDescription,
      chapterOverview:
        index === 0
          ? chapterOneOverview
          : index === 1
            ? chapterTwoOverview
            : index === 2
              ? chapterThreeOverview
            : index === 3
              ? chapterFourOverview
            : index === 4
              ? chapterFiveOverview
            : index === 5
              ? chapterSixOverview
            : index === 6
              ? chapterSevenOverview
            : unit.overview,
      learningObjectives:
        index === 0
          ? chapterOneLearningObjectives
          : index === 1
            ? chapterTwoLearningObjectives
            : index === 2
              ? chapterThreeLearningObjectives
            : index === 3
              ? chapterFourLearningObjectives
            : index === 4
              ? chapterFiveLearningObjectives
            : index === 5
              ? chapterSixLearningObjectives
            : index === 6
              ? chapterSevenLearningObjectives
          : unit.learningObjectives || [
              `Explain the principal criminal-law rules covered in Unit ${index + 1}.`,
              "Apply the relevant IPC principles to legal problems.",
              "Identify the corresponding transition from the IPC to the BNS.",
            ],
      detailedContent: index === 0 ? chapterOneDetailedContent : index <= 6 ? "" : unit.detailedContent,
      keyPoints:
        index === 0
          ? chapterOneKeyPoints
          : index === 1
            ? chapterTwoKeyPoints
            : index === 2
              ? chapterThreeKeyPoints
            : index === 3
              ? chapterFourKeyPoints
            : index === 4
              ? chapterFiveKeyPoints
            : index === 5
              ? chapterSixKeyPoints
            : index === 6
              ? chapterSevenKeyPoints
            : unit.keyPoints,
      statutoryProvisions:
        index <= 6
          ? (index === 0
              ? chapterOneProvisions
              : index === 1
                ? chapterTwoProvisions
                : index === 2
                  ? chapterThreeProvisions
                  : index === 3
                    ? chapterFourProvisions
                    : index === 4
                      ? chapterFiveProvisions
                      : index === 5
                        ? chapterSixProvisions
                        : chapterSevenProvisions
            ).map((provision, provisionIndex) => ({
              id: `unit-${index + 1}-provision-${provisionIndex + 1}`,
              title: provision,
              provision,
              description: `Important statutory reference for Chapter ${index + 1}.`,
            }))
          : unit.provisions.map((provision, provisionIndex) => ({
              id: `unit-${index + 1}-provision-${provisionIndex + 1}`,
              title: provision,
              provision,
              description: `Core statutory reading for Unit ${index + 1}.`,
            })),
      examFocus:
        index === 0
          ? chapterOneExamFocus
          : index === 1
            ? chapterTwoExamFocus
            : index === 2
              ? chapterThreeExamFocus
            : index === 3
              ? chapterFourExamFocus
            : index === 4
              ? chapterFiveExamFocus
            : index === 5
              ? chapterSixExamFocus
            : index === 6
              ? chapterSevenExamFocus
          : unit.examFocus ||
            "Revise the ingredients of each offence, applicable exceptions, distinctions, punishments and the corresponding transition from the IPC to the BNS. Support answers with statutory provisions and leading judicial principles.",
      revisionNotes:
        index === 0
          ? chapterOneRevisionNotes
          : index === 1
            ? chapterTwoRevisionNotes
            : index === 2
              ? chapterThreeRevisionNotes
            : index === 3
              ? chapterFourRevisionNotes
            : index === 4
              ? chapterFiveRevisionNotes
            : index === 5
              ? chapterSixRevisionNotes
            : index === 6
              ? chapterSevenRevisionNotes
            : unit.keyPoints.join("; "),
      notes: index <= 6 ? "" : unit.detailedContent,
      pdfUrl:
        index === 0
          ? "/documents/criminal-law-i/chapter-1-introduction-ipc-bns.pdf"
          : index === 1
            ? "/documents/criminal-law-i/chapter-2-general-explanations-ipc-bns.pdf"
            : index === 2
              ? "/documents/criminal-law-i/chapter-3-punishments-ipc-bns.pdf"
            : index === 3
              ? "/documents/criminal-law-i/chapter-4-general-exceptions-ipc-bns.pdf"
            : index === 4
              ? "/documents/criminal-law-i/chapter-5-abetment-ipc-bns.pdf"
            : index === 5
              ? "/documents/criminal-law-i/chapter-va-criminal-conspiracy-ipc-bns.pdf"
            : index === 6
              ? "/documents/criminal-law-i/chapter-7-armed-forces-offences-ipc-bns.pdf"
          : "",
      pdfFileName:
        index === 0
          ? "Criminal Law I - Chapter I - Introduction.pdf"
          : index === 1
            ? "Criminal Law I - Chapter II - General Explanations.pdf"
            : index === 2
              ? "Criminal Law I - Chapter III - Punishments.pdf"
            : index === 3
              ? "Criminal Law I - Chapter IV - General Exceptions.pdf"
            : index === 4
              ? "Criminal Law I - Chapter V - Abetment.pdf"
            : index === 5
              ? "Criminal Law I - Chapter VA - Criminal Conspiracy.pdf"
            : index === 6
              ? "Criminal Law I - Chapter VII - Armed Forces Offences.pdf"
          : "",
      pdfFileSize:
        index === 0 ? 62858 : index === 1 ? 76489 : index === 2 ? 39413 : index === 3 ? 54969 : index === 4 ? 37726 : index === 5 ? 18632 : index === 6 ? 26550 : 0,
      pdfContentType: index <= 6 ? "application/pdf" : "",
      chapterNumber: index >= 7 ? index + 18 : index >= 6 ? index + 2 : index + 1,
      displayOrder: index >= 7 ? index + 18 : index >= 6 ? index + 2 : index + 1,
      quizRequired: true,
      passingPercentage: 80,
      maximumAttempts: 3,
      published: true,
      status: "published",
      previewAvailable: false,
    }),
);

const stateOffencesUnit = units.find(
  (unit) => unit.title === "Offences against the State",
);

const stateOffencesChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-9`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER VI  OF OFFENCES AGAINST THE STATE",
  slug: "unit-9-offences-against-the-state",
  shortDescription: stateOffencesUnit.shortDescription,
  chapterOverview: stateOffencesUnit.overview,
  learningObjectives: stateOffencesUnit.learningObjectives,
  detailedContent: stateOffencesUnit.detailedContent,
  keyPoints: stateOffencesUnit.keyPoints,
  statutoryProvisions: stateOffencesUnit.provisions.map((provision, index) => ({
    id: `unit-9-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for offences against the State.",
  })),
  examFocus: stateOffencesUnit.examFocus,
  revisionNotes: stateOffencesUnit.keyPoints.join("; "),
  notes: stateOffencesUnit.detailedContent,
  chapterNumber: 7,
  displayOrder: 7,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const publicTranquillityUnit = units.find(
  (unit) => unit.title === "Offences against Public Tranquillity",
);

const publicTranquillityChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-10`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER VIII  OF OFFENCES AGAINST THE PUBLIC TRANQUILLITY",
  slug: "unit-10-offences-against-public-tranquillity",
  shortDescription: publicTranquillityUnit.shortDescription,
  chapterOverview: publicTranquillityUnit.overview,
  learningObjectives: publicTranquillityUnit.learningObjectives,
  detailedContent: publicTranquillityUnit.detailedContent,
  keyPoints: publicTranquillityUnit.keyPoints,
  statutoryProvisions: publicTranquillityUnit.provisions.map((provision, index) => ({
    id: `unit-10-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for offences against public tranquillity.",
  })),
  examFocus: publicTranquillityUnit.examFocus,
  revisionNotes: publicTranquillityUnit.keyPoints.join("; "),
  notes: publicTranquillityUnit.detailedContent,
  pdfUrl: "/documents/criminal-law-i/chapter-8-public-tranquillity-ipc-bns.pdf",
  pdfFileName: "Criminal Law I - Chapter VIII - Public Tranquillity.pdf",
  pdfFileSize: 66197,
  pdfContentType: "application/pdf",
  chapterNumber: 9,
  displayOrder: 9,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const publicServantsChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-11`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER IX  OF OFFENCES BY OR RELATING TO PUBLIC SERVANTS",
  slug: "unit-11-offences-by-or-relating-to-public-servants",
  shortDescription:
    "Compare IPC Sections 166–171 and BNS Sections 198–205, including investigation duties, victim treatment, impersonation and public-servant misconduct.",
  chapterOverview:
    "IPC Chapter IX includes Sections 161–171 and the inserted Sections 165A, 166A and 166B. IPC Sections 161–165A were omitted by Section 31 of the Prevention of Corruption Act, 1988, so they are not current general IPC bribery offences to be mapped into the BNS. The remaining offences in IPC Sections 166–171 correspond principally to BNS Chapter XII, Sections 198–205. This chapter explains the elements of each offence, the changes to procedure references and penalties, and how to assess State amendments and the date of the conduct.",
  learningObjectives: [
    "Explain why omitted IPC Sections 161–165A have no direct BNS counterparts and identify the separate Prevention of Corruption Act framework.",
    "Map IPC Sections 166, 166A, 166B and 167–171 to BNS Sections 198–205.",
    "Distinguish knowing disobedience intended to injure from the special investigation duties in IPC Section 166A and BNS Section 199.",
    "Identify the duty to treat victims under IPC Section 166B and BNS Section 200, with the correct CrPC and BNSS references.",
    "Analyse incorrect documents, prohibited trading and prohibited property transactions by public servants.",
    "Distinguish personating a public servant from wearing official garb or carrying an official token.",
    "Identify changes to community-service availability, impersonation punishment and the fine for misuse of public-servant garb or tokens.",
    "Treat the supplied Kerala and Arunachal Pradesh State-amendment notes as jurisdiction-specific historical material, not automatic BNS provisions.",
  ],
  detailedContent: `CHAPTER IX — OF OFFENCES BY OR RELATING TO PUBLIC SERVANTS

Chapter Overview

IPC Chapter IX addresses misuse of public office and deception about public status. The supplied extract includes repealed bribery sections as well as offences still comparable to BNS Chapter XII. The applicable provision depends on when and where the conduct occurred. The chapter below uses the national BNS text for its comparisons; any State amendment requires separate verification for the relevant jurisdiction and date.

Repealed Bribery Sections: IPC 161–165A

Section 31 of the Prevention of Corruption Act, 1988 omitted IPC Sections 161–165A and preserved the application of the General Clauses Act's saving rule. These old IPC section numbers should not be presented as live BNS offences. Corrupt gratification and related conduct must be assessed under the applicable provisions of the Prevention of Corruption Act and any other relevant law, with the precise date and elements checked. The Kerala amendment to the former IPC Section 161 quoted in the supplied material belongs to this historical context; it does not create a corresponding provision in BNS Chapter XII.

IPC Section 166 → BNS Section 198: Knowing Disobedience Causing Injury

A public servant commits this offence by knowingly disobeying a legal direction governing official conduct while intending to cause injury or knowing injury is likely. Both provisions allow simple imprisonment up to one year, fine, or both. Prove public-servant status, the specific direction of law, knowing disobedience and the required intention or knowledge; a mere mistake in administration does not by itself establish the offence.

IPC Section 166A → BNS Section 199: Investigation Directions and Recording Information

Three alternatives are covered: requiring a person's attendance contrary to law during investigation; disobeying another investigation direction to a person's prejudice; or failing to record specified information concerning listed cognizable offences. The BNS provision refers to Section 173(1) of the Bharatiya Nagarik Suraksha Sanhita, 2023, where the IPC provision referred to Section 154(1) of the Code of Criminal Procedure, 1973. The schedule of underlying offences is expressed in BNS numbers and must be checked against Section 199(c), not converted mechanically from IPC numbers. Punishment is rigorous imprisonment from six months to two years and fine. The Arunachal Pradesh amendment to former IPC Section 166A(c) supplied with the extract must be checked separately for historical local applicability; it does not rewrite the national BNS list.

IPC Section 166B → BNS Section 200: Non-treatment of Victim

The person in charge of a public or private hospital commits the offence by contravening the statutory treatment obligation. The IPC provision referred to CrPC Section 357C; BNS Section 200 refers to BNSS Section 397. Punishment is imprisonment up to one year, fine, or both. Identify the person in charge, the hospital and the underlying statutory treatment duty before applying the penalty.

IPC Section 167 → BNS Section 201: Incorrect Document or Electronic Record

A public servant responsible for preparing or translating a document or electronic record must knowingly or believingly make it incorrect, intending injury or knowing injury is likely. Both statutes provide imprisonment up to three years, fine, or both. The legal duty, falsity, mental element and likely injury must each be established; the existence of a clerical error alone is insufficient.

IPC Section 168 → BNS Section 202: Prohibited Trade

These sections apply where a public servant is legally bound not to engage in trade yet does so. The IPC provides simple imprisonment up to one year, fine, or both. The BNS retains those options and adds community service as a possible alternative. The legal prohibition and the actual trading conduct must be proved.

IPC Section 169 → BNS Section 203: Prohibited Purchase or Bid

A public servant legally barred from buying or bidding for certain property commits this offence by purchasing or bidding in their own name, another's name, jointly or in shares. Both statutes provide simple imprisonment up to two years, fine, or both, and confiscation of the property if purchased. Identify the particular legal restriction and the transaction.

IPC Section 170 → BNS Section 204: Personating a Public Servant

A person who knows they do not hold a public office pretends to hold it, or falsely impersonates another office-holder, and performs or attempts an act under colour of that office. IPC Section 170 provides imprisonment up to two years, fine, or both. BNS Section 204 prescribes imprisonment of at least six months and up to three years, and fine. An empty boast or costume without the required act under colour of office must be distinguished from this offence.

IPC Section 171 → BNS Section 205: Garb or Token

Someone outside a class of public servants wears similar official garb or carries a similar token intending or knowing it likely that others will believe they belong to that class. The maximum imprisonment remains three months. The maximum fine changes from ₹200 in the supplied IPC text to ₹5,000 under BNS Section 205; either provision also permits both imprisonment and fine. Focus on the resemblance and the intended or likely false belief.

Exam Focus and Revision Map

Historical IPC 161–165A: omitted under the Prevention of Corruption Act, with no direct BNS Chapter XII renumbering. IPC 166 → BNS 198; 166A → 199; 166B → 200; 167 → 201; 168 → 202; 169 → 203; 170 → 204; 171 → 205. For a problem, establish date, jurisdiction, public-servant status or impersonation, the exact prohibited act and mental element, then compare the applicable penalty. Treat State-specific amendments separately from the national statutory text.`,
  keyPoints: [
    "IPC Sections 161–165A were omitted under the Prevention of Corruption Act, 1988; do not renumber them into the BNS.",
    "IPC Sections 166, 166A and 166B correspond to BNS Sections 198, 199 and 200.",
    "BNS Section 199(c) refers to BNSS Section 173(1), while IPC Section 166A(c) referred to CrPC Section 154(1).",
    "BNS Section 200 refers to BNSS Section 397, while IPC Section 166B referred to CrPC Section 357C.",
    "IPC Sections 167–171 correspond to BNS Sections 201–205.",
    "BNS Section 202 adds community service as a possible penalty for prohibited trade.",
    "BNS Section 204 raises the punishment for public-servant impersonation to a minimum of six months and a maximum of three years, plus fine.",
    "BNS Section 205 raises the maximum fine for deceptive public-servant garb or a token to ₹5,000.",
    "State amendments in the supplied IPC extract are not automatic amendments to the national BNS text.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Sections 161–165A (omitted under Prevention of Corruption Act, 1988, Section 31)",
    "Indian Penal Code, 1860 — Sections 166, 166A and 166B",
    "Indian Penal Code, 1860 — Sections 167–171",
    "Bharatiya Nyaya Sanhita, 2023 — Sections 198–205",
    "Prevention of Corruption Act, 1988 — Section 31 and applicable substantive provisions",
    "Code of Criminal Procedure, 1973 — Sections 154(1) and 357C (historical IPC references)",
    "Bharatiya Nagarik Suraksha Sanhita, 2023 — Sections 173(1) and 397",
  ].map((provision, index) => ({
    id: `unit-11-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for public-servant offences.",
  })),
  examFocus:
    "Map the alleged facts to the exact IPC or BNS provision based on the date of conduct. Explain the repeal of IPC Sections 161–165A without treating corruption offences as decriminalised. For Sections 166–171, show the statutory duty, act, mental element and any injury; distinguish an actual public servant's misconduct from a false claim of official status. Identify the specific changes in BNS Sections 199, 200, 202, 204 and 205, and check State amendments only when jurisdiction and date make them relevant.",
  revisionNotes:
    "Omitted IPC 161–165A: Prevention of Corruption Act, 1988. IPC 166/166A/166B → BNS 198/199/200; IPC 167–171 → BNS 201–205. BNS 199 uses BNSS 173(1), BNS 200 uses BNSS 397, BNS 202 allows community service, BNS 204 increases the impersonation sentence, and BNS 205 raises the fine limit. Verify date and State-specific amendments.",
  pdfUrl: "/documents/criminal-law-i/chapter-9-public-servants-ipc-bns.pdf",
  pdfFileName: "Criminal Law I - Chapter IX - Public Servants.pdf",
  pdfFileSize: 55277,
  pdfContentType: "application/pdf",
  chapterNumber: 10,
  displayOrder: 10,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const electionOffencesChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-12`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER IXA  OF OFFENCES RELATING TO ELECTIONS",
  slug: "unit-12-offences-relating-to-elections",
  shortDescription:
    "Study IPC Sections 171A–171I alongside BNS Sections 169–177: electoral rights, bribery, undue influence, personation, statements, spending and accounts.",
  chapterOverview:
    "IPC Chapter IXA sets out election offences in Sections 171A–171I. The corresponding BNS provisions are in Chapter IX, Sections 169–177. This chapter explains who is a candidate, what counts as an electoral right, and the elements and penalties for bribery, undue influence, personation, knowingly false statements about candidates, unauthorised spending and failure to keep election accounts. It highlights the increased BNS fine limits for spending and accounts and distinguishes permitted public-policy promises and lawful proxy voting from prohibited conduct.",
  learningObjectives: [
    "Map each IPC provision in Sections 171A–171I to BNS Sections 169–177.",
    "Explain the definitions of candidate and electoral right, including the right to abstain or withdraw.",
    "Distinguish electoral bribery from lawful promises of public policy and explain deemed giving or acceptance of gratification.",
    "Identify threats, spiritual coercion and other voluntary interference constituting undue influence.",
    "Analyse personation, repeat voting, abetment and the authorised-proxy exception.",
    "Distinguish ordinary electoral bribery from treating and apply their different punishments.",
    "Explain the mental and factual elements of a false statement about a candidate's personal character or conduct.",
    "Apply written-authority and accounts rules and compare the IPC and BNS fine limits.",
  ],
  detailedContent: `CHAPTER IXA — OF OFFENCES RELATING TO ELECTIONS

Chapter Overview

The IPC places these offences in Chapter IXA, Sections 171A–171I. The BNS places their corresponding provisions in Chapter IX, Sections 169–177. The order and underlying subjects are substantially preserved, but the BNS raises the maximum fines for unauthorised election spending and failure to keep election accounts. Always identify the date of the act and the precise provision before selecting the applicable law.

IPC Section 171A → BNS Section 169: Candidate and Electoral Right

A candidate is a person nominated as a candidate at an election. An electoral right includes standing or not standing as a candidate, withdrawing a candidacy, voting and refraining from voting. The offence provisions protect these choices. The statutory definitions, rather than a person's broad political interests, control the answer.

IPC Section 171B → BNS Section 170: Bribery

Giving gratification to induce or reward exercise of another's electoral right, or accepting gratification as a reward for exercise or inducement, constitutes electoral bribery. An offer, agreement or attempt to procure gratification may count as giving; an agreement or attempt to obtain it may count as acceptance. The statute also deals with purported rewards even where the promised action was not intended or performed. A declaration of public policy or promise of public action is excluded. Distinguish a benefit conditioned on a vote from a general public-policy proposal by examining purpose, recipient, timing and evidence.

IPC Section 171C → BNS Section 171: Undue Influence

Voluntary interference or attempted interference with free exercise of an electoral right is prohibited. Threatening injury to a voter, candidate or interested person, or inducing belief in divine displeasure or spiritual censure, are express examples. A public-policy declaration, public-action promise or mere exercise of a legal right without intent to interfere is excluded. Show the particular interference and the affected electoral choice; strong political persuasion alone is not necessarily undue influence.

IPC Section 171D → BNS Section 172: Personation

Applying for a voting paper or voting in another person's name, a deceased person's name or a fictitious name, or applying again in one's own name after already voting at the same election, constitutes personation. Abetting or procuring such voting also falls within the provision. Lawfully authorised proxy voting is excluded to the extent the proxy votes within that authority. Verify the identity, application or vote, election and proxy status rather than treating every assisted vote as personation.

IPC Section 171E → BNS Section 173: Punishment for Bribery

Ordinary bribery carries imprisonment up to one year, fine, or both. Bribery by treating is punishable by fine only. Treating means gratification in the form of food, drink, entertainment or provision. Identify the form of gratification before stating the punishment.

IPC Section 171F → BNS Section 174: Punishment for Undue Influence or Personation

Either offence is punishable by imprisonment up to one year, fine, or both. The penalty provision follows the definitions: cite Section 171C or 171D with IPC 171F, or BNS Section 171 or 172 with BNS 174, as applicable.

IPC Section 171G → BNS Section 175: False Statement about a Candidate

The accused must make or publish a purported factual statement about a candidate's personal character or conduct, knowing or believing it false or not believing it true, with intent to affect the election result. The punishment is fine. A false claim about the candidate's personal conduct must be distinguished from a policy opinion or a disputed prediction; prove the stated knowledge and electoral purpose.

IPC Section 171H → BNS Section 176: Unauthorised Election Payments

The offence concerns expenses incurred or authorised to promote a candidate's election without the candidate's general or special written authority. Both statutes retain the narrow proviso for unauthorised expenses not exceeding ₹10 where written approval is obtained within ten days. The maximum fine rises from ₹500 in the supplied IPC text to ₹10,000 under BNS Section 176. Identify who paid, the election purpose, the written authority and whether the proviso applies.

IPC Section 171I → BNS Section 177: Failure to Keep Election Accounts

The accused must be required by a law or legally effective rule to keep election-expense accounts and must fail to do so. The maximum fine increases from ₹500 under the IPC provision to ₹5,000 under BNS Section 177. Do not assume every participant has this accounting duty; first identify the law or rule imposing it.

Revision Map and Exam Method

IPC 171A → BNS 169; 171B → 170; 171C → 171; 171D → 172; 171E → 173; 171F → 174; 171G → 175; 171H → 176; 171I → 177. In a problem, identify the electoral right, the alleged action and its mental element, then check statutory exclusions or written authority. Separate bribery, influence, personation, false statements, spending and accounts; cite the appropriate punishment provision and compare the fine limit by the date of the act.`,
  keyPoints: [
    "IPC Chapter IXA Sections 171A–171I correspond, in order, to BNS Chapter IX Sections 169–177.",
    "Electoral rights include standing, withdrawing, voting and refraining from voting.",
    "Promises of public policy and public action are expressly excluded from the bribery provision.",
    "Threats and inducing belief in divine displeasure are express forms of electoral undue influence.",
    "Authorised proxy voting is excluded from personation to the extent of the proxy's authority.",
    "Bribery by treating is punishable by fine only; ordinary bribery can also attract up to one year's imprisonment.",
    "A false-statement offence requires a purported fact about the candidate's personal character or conduct and intent to affect the result.",
    "The maximum unauthorised-spending fine rises from IPC ₹500 to BNS ₹10,000.",
    "The maximum fine for failing to keep required election accounts rises from IPC ₹500 to BNS ₹5,000.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter IXA, Sections 171A–171I",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter IX, Sections 169–177",
  ].map((provision, index) => ({
    id: `unit-12-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for election offences.",
  })),
  examFocus:
    "Start with the exact electoral right and the date of conduct. For bribery, identify giver or recipient, gratification and inducement or reward; apply the public-policy exception and treating penalty where appropriate. For undue influence and personation, identify the prohibited interference or false voting and any lawful proxy. For statements, prove false fact, knowledge and electoral purpose. For spending or accounting, identify the written authority or legal duty, then use the correct IPC or BNS fine limit.",
  revisionNotes:
    "IPC 171A–171I → BNS 169–177 in order. Bribery: 171B/170, punishment 171E/173. Undue influence: 171C/171; personation: 171D/172; punishment 171F/174. False statement: 171G/175. Unauthorised spending: 171H/176 (₹500 → ₹10,000 maximum fine). Accounts: 171I/177 (₹500 → ₹5,000 maximum fine).",
  pdfUrl: "/documents/criminal-law-i/chapter-9a-election-offences-ipc-bns.pdf",
  pdfFileName: "Criminal Law I - Chapter IXA - Election Offences.pdf",
  pdfFileSize: 53972,
  pdfContentType: "application/pdf",
  chapterNumber: 11,
  displayOrder: 11,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const lawfulAuthorityChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-13`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER X  OF CONTEMPTS OF THE LAWFUL AUTHORITY OF PUBLIC SERVANTS",
  slug: "unit-13-contempts-of-the-lawful-authority-of-public-servants",
  shortDescription:
    "Study IPC Sections 172–190 alongside BNS Sections 206–225: summons, proclamations, required information, public sales, official orders and threats.",
  chapterOverview:
    "IPC Chapter X protects the lawful authority of public servants in Sections 172–190, including Section 174A. The corresponding BNS offences appear in Chapter XIII, Sections 206–225. This chapter maps every provision, distinguishes refusal and omission from deliberate falsehood, and explains changes to fines, proclamation procedure and disobedience penalties. It also identifies BNS Section 226 as an additional provision without a direct counterpart in this IPC chapter.",
  learningObjectives: [
    "Map IPC Sections 172–190, including 174A, to BNS Sections 206–225.",
    "Distinguish evading service, preventing service, nonattendance and failure to respond to a proclamation.",
    "Identify the legal duty and mental element for withholding documents or information and for furnishing false information.",
    "Separate refusal of an oath, refusal to answer or sign, and a knowingly false statement on oath.",
    "Analyse obstruction of seizure, public sale or a public servant, and failure to give legally required assistance.",
    "Apply the two tiers of disobedience of a duly promulgated order and compare IPC and BNS punishments.",
    "Explain threats to public servants and threats deterring requests for lawful protection.",
  ],
  detailedContent: `CHAPTER X — OF CONTEMPTS OF THE LAWFUL AUTHORITY OF PUBLIC SERVANTS

Chapter Overview

IPC Chapter X comprises Sections 172–190, including the inserted Section 174A. The corresponding BNS provisions are Chapter XIII, Sections 206–225. The numbering changes, but each of the twenty IPC provisions has a direct BNS counterpart. Apply the statute in force on the date of the conduct. These offences generally require a lawful notice, duty, proceeding, order or official act; identify that foundation before assessing conduct or punishment. References in older IPC text to the Code of Criminal Procedure must be checked against the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) for a BNS problem.

IPC Section 172 → BNS Section 206: Absconding to Avoid Service

The accused absconds to avoid service of a summons, notice or order from a legally competent public servant. Distinguish purposeful avoidance from a failure to receive service. Both laws distinguish an ordinary process from one requiring attendance or production before a court. BNS raises the respective maximum fines to ₹5,000 and ₹10,000; the imprisonment limits remain one month and six months.

IPC Section 173 → BNS Section 207: Preventing Service or Publication

Intentional prevention of service on oneself or another, lawful affixing or publication, or lawful public proclamation falls here. Show the lawful process and intentional obstruction. The court-related tier has a higher punishment. BNS raises the ordinary and court-related fine ceilings to ₹5,000 and ₹10,000.

IPC Section 174 → BNS Section 208: Nonattendance in Obedience to an Order

A person legally bound to attend at a specified place and time intentionally omits to do so, or leaves prematurely. Prove the summons, notice, order or proclamation, the duty to attend, and intentional noncompliance. Court attendance and production before a court attract the higher tier. BNS raises the fine ceilings to ₹5,000 and ₹10,000 respectively.

IPC Section 174A → BNS Section 209: Nonappearance after Proclamation

The IPC provision refers to a proclamation under Section 82 of the Code of Criminal Procedure, 1973; the BNS provision refers to Section 84(1) of the BNSS. Ordinary nonappearance carries imprisonment up to three years, fine, both, or community service under BNS. A person declared a proclaimed offender under BNSS Section 84(4) faces imprisonment up to seven years and fine. Establish the valid proclamation and whether the more serious proclaimed-offender finding exists.

IPC Section 175 → BNS Section 210: Omission to Produce Document or Electronic Record

A person legally bound to produce or deliver a document or electronic record intentionally fails to do so. The court-related tier is more serious. Distinguish absence of a legal obligation or genuine inability to produce from intentional omission. Identify the precise order, record and public servant entitled to receive it.

IPC Section 176 → BNS Section 211: Omission to Give Notice or Information

An intentional failure to give a legally required notice or information to a public servant is distinct from giving false information. BNS has ordinary, offence-related and specified BNSS order tiers, with fine ceilings of ₹5,000, ₹10,000 and ₹1,000 respectively. The special BNS tier refers to an order under BNSS Section 394; old IPC text may cite a superseded procedural statute.

IPC Section 177 → BNS Section 212: Furnishing False Information

A person legally bound to furnish information knowingly supplies false information as true. A higher tier applies where the information concerns an offence, its prevention or apprehension of an offender. Prove the duty, falsity, knowledge and relevant subject. The ordinary BNS fine ceiling is ₹5,000.

IPC Section 178 → BNS Section 213: Refusing an Oath or Affirmation

Refusal to bind oneself by oath or affirmation when a competent public servant lawfully requires it constitutes this offence. Ask whether the official had authority and the requirement was lawful; mere disagreement with an inquiry is insufficient.

IPC Section 179 → BNS Section 214: Refusing to Answer

A person legally bound to state the truth refuses to answer a question on a subject about which the public servant is empowered to ask. Identify the particular lawful question, duty to answer and refusal.

IPC Section 180 → BNS Section 215: Refusing to Sign a Statement

The offence requires refusal to sign a statement when a public servant legally competent to require the signature demands it. Distinguish a refusal to sign from contesting the accuracy of a statement where no lawful signature duty is shown.

IPC Section 181 → BNS Section 216: False Statement on Oath or Affirmation

A person legally bound by an oath or affirmation makes a statement to a public servant or other authorised recipient, knowing or believing it false or not believing it true. BNS retains a maximum of three years' imprisonment and fine. Analyse the form of legal obligation and the accused's state of mind.

IPC Section 182 → BNS Section 217: False Information Intended to Misuse Official Power

The accused knowingly provides false information intending or knowing it likely to cause a public servant to act or omit an act contrary to lawful duty, or to use lawful power to injure or annoy someone. The information need not have been furnished under a separate statutory duty; distinguish this offence from Sections 177/212. BNS retains a maximum of one year's imprisonment and raises the fine ceiling to ₹10,000.

IPC Section 183 → BNS Section 218: Resisting Lawful Taking of Property

Resistance to a public servant's lawful taking of property under that servant's authority is prohibited. Identify the official's lawful authority and the act of resistance. BNS allows imprisonment up to six months, fine up to ₹10,000, or both.

IPC Section 184 → BNS Section 219: Obstructing Sale by Authority of Public Servant

Intentional obstruction of a lawful sale of property offered by a public servant is distinct from bidding unlawfully at the sale. BNS allows imprisonment up to one month, fine up to ₹5,000, or both.

IPC Section 185 → BNS Section 220: Illegal Purchase or Bid at Public Sale

The offence covers a purchase or bid at a public-servant sale by someone legally incapacitated from purchasing, bidding without intent to perform legal obligations, or bidding for a person known to be incapacitated. Establish the sale and the relevant prohibition or improper purpose. BNS retains imprisonment up to one month, fine up to ₹200, or both.

IPC Section 186 → BNS Section 221: Obstructing Public Servant in Public Functions

Voluntary obstruction of a public servant in the discharge of public functions falls here. Specify the official act, public function and actual voluntary obstruction. BNS raises the maximum fine to ₹2,500 while retaining imprisonment up to three months.

IPC Section 187 → BNS Section 222: Omitting to Assist a Public Servant

A person legally bound to render assistance intentionally fails to do so. A higher tier applies when the aid is demanded to execute process, prevent an offence or riot or affray, or apprehend an offender. BNS fine ceilings are ₹2,500 for ordinary omission and ₹5,000 for the higher tier; establish the source of the legal duty.

IPC Section 188 → BNS Section 223: Disobeying a Duly Promulgated Order

A public servant lawfully empowered must have promulgated an order and the accused must know of it and disobey it. The ordinary tier requires actual or likely obstruction, annoyance or injury; BNS allows simple imprisonment up to six months or fine up to ₹2,500 or both. Where disobedience causes or risks danger to human life, health or safety, or causes or risks a riot or affray, BNS allows imprisonment up to one year or fine up to ₹5,000 or both. Intent to cause harm is unnecessary when the statutory knowledge, disobedience and resulting risk are proved. The IPC limits were one month/₹200 and six months/₹1,000 respectively.

IPC Section 189 → BNS Section 224: Threat of Injury to a Public Servant

Threatening injury to a public servant or someone in whom the servant is interested, to induce the servant to act, refrain from acting or delay an official function, carries imprisonment up to two years, fine, or both. Distinguish the threatened injury and the intended influence on public duty from an ordinary dispute.

IPC Section 190 → BNS Section 225: Threat to Deter a Request for Protection

Threatening injury to make a person refrain from applying to a public servant for lawful protection carries imprisonment up to one year, fine, or both. The threatened person and purpose differ from Section 189/224; the protection must be one the public servant is legally empowered to give.

Additional BNS Provision and Revision Map

BNS Section 226 appears in the same BNS chapter but has no direct counterpart in the supplied IPC Chapter X. It addresses an attempt to commit suicide intended to compel or restrain a public servant from official duty; its maximum punishment includes simple imprisonment up to one year, fine, both or community service. Study it as an additional statutory offence, not as a renumbering of IPC Section 190.

IPC 172–174 → BNS 206–208; IPC 174A → BNS 209; IPC 175–190 → BNS 210–225, in sequence. In a problem answer, prove lawful authority and the relevant duty or process, specify deliberate avoidance, refusal, falsehood, obstruction, disobedience or threat, and select the correct tier and date-sensitive punishment.`,
  keyPoints: [
    "IPC 172–174 map to BNS 206–208; IPC 174A maps to BNS 209; IPC 175–190 map in sequence to BNS 210–225.",
    "Lawful authority, a valid process or order, and the applicable legal duty are foundational facts.",
    "BNS 209 updates the proclamation reference to BNSS 84 and allows community service for ordinary nonappearance.",
    "Omitting to supply required information (IPC 176/BNS 211) differs from knowingly providing false information (IPC 177/BNS 212).",
    "False information intended to trigger misuse of official power has a separate offence (IPC 182/BNS 217).",
    "BNS 223 raises both imprisonment and fine limits for disobeying a duly promulgated order.",
    "BNS 226 is an additional provision in the BNS chapter, without a direct IPC Chapter X counterpart.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter X, Sections 172–190 (including Section 174A)",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter XIII, Sections 206–226",
    "Bharatiya Nagarik Suraksha Sanhita, 2023 — Sections 84 and 394",
  ].map((provision, index) => ({
    id: `unit-13-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for contempt of lawful public authority.",
  })),
  examFocus:
    "Map IPC 172–190 (including 174A) to BNS 206–225, prove lawful authority and the required mental element, and distinguish the ordinary and aggravated tiers. For BNS 209 use BNSS 84; for 223 compare the higher BNS punishment limits. Identify BNS 226 separately and select the statute applicable on the date of conduct.",
  revisionNotes:
    "IPC 172/173/174 → BNS 206/207/208; 174A → 209; 175–190 → 210–225 in order. Avoidance/service/attendance: 206–209. Documents and information: 210–212. Oath, answers and statements: 213–217. Property, sales and official assistance: 218–222. Orders and threats: 223–225. BNS 226 is additional. Check BNSS 84 and 394 and the date of the alleged offence.",
  pdfUrl: "/documents/criminal-law-i/chapter-10-lawful-authority-ipc-bns.pdf",
  pdfFileName: "Criminal Law I - Chapter X - Lawful Authority of Public Servants.pdf",
  pdfFileSize: 59457,
  pdfContentType: "application/pdf",
  chapterNumber: 12,
  displayOrder: 12,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

// IPC Chapter XI spans several subjects. Keep the individual cross-references
// explicit: a contiguous numeric offset fails at the inserted and repealed sections.
const publicJusticeSectionMap = [
  ["191", "227", "Giving false evidence", "A person under an oath, express legal duty or legally required declaration states something they know or believe is false, or do not believe true. A sincerely held but mistaken belief is different."],
  ["192", "228", "Fabricating false evidence", "Creating a false circumstance, entry or document (including an electronic record) intending to mislead a decision-maker about a material point in a judicial or other legally authorised proceeding."],
  ["193", "229", "Punishment for false evidence", "The judicial-proceeding tier permits imprisonment up to seven years and fine up to ₹10,000; other cases permit up to three years and fine up to ₹5,000. BNS specifies the fine ceilings."],
  ["194", "230", "False evidence to procure conviction for a capital offence", "Giving or fabricating evidence with the required intent or knowledge about a capital conviction carries life imprisonment or rigorous imprisonment up to ten years and fine up to ₹50,000; an innocent person's conviction and execution triggers the separate, more severe consequence."],
  ["195", "231", "False evidence to procure conviction for a serious non-capital offence", "The intended conviction must concern an offence punishable by life imprisonment or imprisonment for seven years or more; punishment follows the offence for which conviction was sought."],
  ["195A", "232", "Threatening a person to give false evidence", "Threatening injury to person, reputation or property with intent to cause false evidence is separately punishable. The statute provides a further consequence when an innocent person is sentenced as a result."],
  ["196", "233", "Using evidence known to be false", "Corruptly using or trying to use false or fabricated evidence as genuine is punished like giving or fabricating false evidence."],
  ["197", "234", "Issuing or signing a false certificate", "A legally required or evidential certificate known or believed false on a material point attracts the false-evidence punishment."],
  ["198", "235", "Using a false certificate", "Corruptly using or attempting to use a certificate known false on a material point attracts the false-evidence punishment."],
  ["199", "236", "False evidential declaration", "A knowingly or believed-false material statement in a declaration legally receivable as evidence is punished like false evidence."],
  ["200", "237", "Using a false declaration", "Corrupt use or attempted use of such a declaration, knowing it false in a material respect, is separately covered; an informality alone does not remove it from the provision."],
  ["201", "238", "Disappearing evidence or false information to screen an offender", "The accused knows or has reason to believe an offence occurred and intends to shield the offender. The penalty depends on the underlying offence's maximum punishment."],
  ["202", "239", "Omitting legally required information about an offence", "A person legally bound to report an offence intentionally fails to give that information; BNS caps the fine at ₹5,000."],
  ["203", "240", "False information about an offence", "A person knowing or having reason to believe an offence occurred supplies information about it that they know or believe to be false; this differs from concealment intended to screen an offender."],
  ["204", "241", "Destroying a document or electronic record to prevent its use", "Secretly removing, destroying or rendering illegible material that can lawfully be required as evidence, to prevent its use; BNS provides imprisonment up to three years or fine up to ₹5,000 or both."],
  ["205", "242", "False personation in a suit or prosecution", "Assuming another person's identity to make a statement, admit, arrange process, stand bail or undertake another act in litigation or prosecution."],
  ["206", "243", "Concealing property from forfeiture or execution", "Fraudulently transferring, hiding or removing property to defeat an actual or likely forfeiture, fine or civil decree; BNS raises the imprisonment ceiling to three years."],
  ["207", "244", "Fraudulent property claim to prevent seizure", "Falsely receiving or claiming a property interest without entitlement to prevent its lawful forfeiture or execution."],
  ["208", "245", "Fraudulently suffering an undue decree", "Allowing a decree or order against oneself for an amount or property not due, with the required fraudulent purpose."],
  ["209", "246", "Dishonestly making a false claim in court", "A claim known to be false is made fraudulently, dishonestly or with intent to injure or annoy another person."],
  ["210", "247", "Fraudulently obtaining an undue decree", "Obtaining a decree or order for an amount or property not due, or causing enforcement after satisfaction, with the required fraudulent state of mind."],
  ["211", "248", "False criminal charge intended to injure", "Instituting proceedings or accusing someone despite knowing there is no just or lawful ground, with intent to injure. BNS sets up to five years or fine up to ₹2 lakh for the ordinary tier and up to ten years plus fine for the aggravated tier."],
  ["212", "249", "Harbouring an offender", "Knowingly concealing an offender to screen them from punishment; the sentence scales with the underlying offence. The statutory spouse exception must be checked."],
  ["213", "250", "Taking a benefit to screen an offender", "Accepting or seeking gratification or property restoration in exchange for concealment, screening or refraining from prosecution; punishment depends on the underlying offence."],
  ["214", "251", "Offering a benefit to screen an offender", "Offering gratification or restoring property in exchange for concealment, screening or refraining from prosecution; the statutory exception for an offence lawfully compoundable must be considered."],
  ["215", "252", "Taking a benefit to help recover stolen property", "Taking a benefit on the pretence of helping recover movable property without using all available means to apprehend the offender."],
  ["216", "253", "Harbouring an escapee or person ordered to be apprehended", "Knowingly concealing a person escaped from custody or whose apprehension has been ordered to prevent apprehension; the penalty depends on the underlying charge or sentence."],
  ["216A", "254", "Harbouring robbers or dacoits", "Knowing or having reason to believe persons are about to commit or recently committed robbery or dacoity, harbouring them to facilitate the offence or screen them from punishment; the statutory spouse exception applies."],
  ["217", "255", "Public servant disobeying law to protect person or property", "An official knowingly disobeys a legal direction intending to save someone from legal punishment or property from forfeiture or charge."],
  ["218", "256", "Public servant making an incorrect record", "An official knowingly frames an incorrect record or writing intending or knowing it likely to cause loss or injury, protect a person from punishment or save property from forfeiture or charge."],
  ["219", "257", "Public servant corruptly deciding contrary to law", "An official in a judicial proceeding corruptly or maliciously makes a report, order, verdict or decision known to be contrary to law."],
  ["220", "258", "Unlawful commitment for trial or confinement", "A person authorised to commit someone for trial or confinement does so knowing the act is contrary to law."],
  ["221", "259", "Public servant intentionally failing to apprehend a person charged", "An official legally bound to arrest or confine an accused or person liable to apprehension intentionally omits arrest or permits escape; the seriousness of the underlying offence sets the tier."],
  ["222", "260", "Public servant intentionally failing to apprehend a sentenced person", "Intentional non-arrest, escape or assistance to escape for a sentenced person or lawful detainee, with tiers according to the sentence or custody."],
  ["223", "261", "Public servant negligently allowing escape", "Unlike the preceding intentional offences, this provision addresses a negligent escape from lawful confinement."],
  ["224", "262", "Resisting one's own lawful apprehension", "Intentionally resisting lawful arrest for an offence, or escaping or attempting escape from lawful custody; punishment is additional to the underlying offence."],
  ["225", "263", "Resisting another's lawful apprehension or rescue", "Obstructing another person's lawful arrest or rescuing them from lawful custody; separate punishment tiers reflect the underlying charge or sentence."],
  ["225A", "264", "Other failure by public servant to apprehend", "Residual provision for an official legally bound to arrest or confine a person where Sections 259–261 do not apply; distinguishes intentional and negligent failure."],
  ["225B", "265", "Other resistance, escape or rescue", "Residual provision for resistance to arrest or escape or rescue where Sections 262–263 and other applicable law do not cover the conduct."],
  ["227", "266", "Breach of conditional remission", "A person who accepts conditional remission knowingly breaches its condition and becomes liable to the original punishment, less any part already served."],
  ["228", "267", "Insult or interruption during judicial proceeding", "Intentional insult or interruption of a public servant sitting in a judicial proceeding; BNS raises the maximum fine to ₹5,000."],
  ["228A(1)–(2)", "72", "Disclosure of a victim's identity", "The rule against publishing information identifying victims of specified sexual offences and its narrow written-authorisation exceptions now appear in the BNS chapter on offences against women and children."],
  ["228A(3)", "73", "Publication of court proceedings without permission", "The distinct IPC rule about publishing proceedings concerning such offences without the court's prior permission is BNS Section 73, subject to the statutory exception for Supreme Court and High Court judgments."],
  ["229", "268", "Personation of an assessor", "The BNS text refers to an assessor, whereas the IPC provision also refers to jurors; knowingly obtaining or serving in a role for which one is legally ineligible is prohibited."],
  ["229A", "269", "Failure to appear after release on bail bond or bond", "Absence without sufficient cause contrary to the bail bond or bond attracts a separate penalty; forfeiture of the bond and liability for the underlying offence remain possible."],
];

const publicJusticeChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-14`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER XI  OF FALSE EVIDENCE AND OFFENCES AGAINST PUBLIC JUSTICE",
  slug: "unit-14-false-evidence-and-offences-against-public-justice",
  shortDescription:
    "Compare IPC Chapter XI (Sections 191–229A) with BNS Chapter XIV (Sections 227–269), including the victim-identity provisions relocated to BNS 72–73.",
  chapterOverview:
    "This chapter follows the supplied IPC Chapter XI from false evidence and fabrication through suppression of evidence, screening offenders, public-servant misconduct, escape, and court-related offences. The principal BNS counterparts are Chapter XIV, Sections 227–269. IPC Section 228A is split across BNS Sections 72–73 in a different chapter. IPC Sections 216B and 226 are already repealed in the supplied text and are not presented as current offences.",
  learningObjectives: [
    "Map each active IPC Chapter XI offence to its corresponding BNS provision.",
    "Distinguish a knowingly false statement under a duty of truth from fabrication and corrupt use of fabricated evidence.",
    "Apply the aggravated provisions for false evidence aimed at capital or other serious convictions and for witness threats.",
    "Distinguish concealment of evidence, failure to report, false information, harbouring, and benefits for screening offenders.",
    "Recognise the different duties and mental elements for official misconduct, apprehension, custody and escape.",
    "Locate the victim-identity rules at BNS Sections 72–73 and the other court-related rules at Sections 266–269.",
  ],
  detailedContent: `CHAPTER XI — OF FALSE EVIDENCE AND OFFENCES AGAINST PUBLIC JUSTICE

Chapter Overview

The supplied IPC text covers Sections 191–229A, including inserted lettered sections. Most active counterparts appear in BNS Chapter XIV, Sections 227–269. The exceptions are IPC Section 228A, split into BNS Sections 72 and 73, and the already repealed IPC Sections 216B and 226. For each problem, check the date of conduct, the applicable statute and the elements rather than relying on a section number alone.

${publicJusticeSectionMap.map(([ipc, bns, heading, explanation]) => `IPC Section ${ipc} → BNS Section ${bns}: ${heading}\n\n${explanation}`).join("\n\n")}

Repealed Provisions and Key Distinctions

IPC Section 216B (definition of harbour) and IPC Section 226 (unlawful return from transportation) are recorded as repealed in the supplied text; do not map them to a new BNS offence. IPC Section 228A(1)–(2) maps to BNS 72, while its separate publication-of-proceedings rule in subsection (3) maps to BNS 73. A false statement under a legal duty (191/227), a fabricated item intended for use as evidence (192/228), and corrupt use of known false evidence (196/233) require different conduct. Likewise, screening an offender (201/238), simply failing a legal reporting duty (202/239), and giving information known false (203/240) have different elements. For public servants, distinguish intentional omissions (221–222/259–260) from negligent escape (223/261). The BNS section on assessor personation (268) does not repeat the IPC's juror language.

Exam Method

First prove any oath, legal duty, official power, court process, underlying offence or lawful custody required by the selected provision. Then identify the accused's knowledge, intent, fraud, corruption or negligence and any statutory exception. Use the aggravated sentencing tier only when its additional facts are established. Select IPC or BNS by the relevant date, and treat changes in fine limits, imprisonment and placement as substantive comparison points.`,
  keyPoints: [
    "IPC 191–195 and 195A correspond to BNS 227–232; IPC 196–225B correspond in order to BNS 233–265, subject to inserted IPC sections.",
    "IPC 228A(1)–(2) → BNS 72 and IPC 228A(3) → BNS 73; these BNS provisions are outside Chapter XIV.",
    "IPC 216B and IPC 226 are repealed in the supplied text and have no direct active offence to carry forward.",
    "IPC 227–229A correspond to BNS 266–269, with IPC 228A mapped separately to 72–73.",
    "Giving, fabricating and using false evidence are distinct forms of misconduct; verify materiality and mental state.",
    "BNS 229 sets fine ceilings of ₹10,000 for judicial proceedings and ₹5,000 for other false-evidence cases.",
    "BNS 248 provides an ordinary fine ceiling of ₹2 lakh for a false charge intended to injure.",
    "BNS 268 addresses personation of an assessor and omits the IPC provision's juror wording.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter XI, Sections 191–229A (including inserted and repealed sections)",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter XIV, Sections 227–269",
    "Bharatiya Nyaya Sanhita, 2023 — Sections 72–73 (victim identity and proceedings)",
  ].map((provision, index) => ({
    id: `unit-14-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for false evidence and public justice.",
  })),
  examFocus:
    "Identify the precise IPC-to-BNS pair, requisite legal duty, mental state and any aggravated sentencing fact. Do not collapse false evidence, concealment, false charges, official misconduct and escape into one offence. Mention the BNS 72–73 split for IPC 228A, the repealed IPC 216B/226 provisions and the assessor-only language of BNS 268.",
  revisionNotes:
    "IPC 191–195A → BNS 227–232; IPC 196–225B → BNS 233–265 (216B repealed); IPC 226 repealed; IPC 227/228 → BNS 266/267; IPC 228A(1)–(2)/(3) → BNS 72/73; IPC 229/229A → BNS 268/269. Compare fine ceilings, section elements and relevant dates.",
  pdfUrl: "/documents/criminal-law-i/chapter-11-public-justice-ipc-bns.pdf",
  pdfFileName: "Criminal Law I - Chapter XI - False Evidence and Public Justice.pdf",
  pdfFileSize: 70465,
  pdfContentType: "application/pdf",
  chapterNumber: 13,
  displayOrder: 13,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

// The BNS consolidates former general-coin and Indian-coin offences. Several
// IPC provisions therefore share a BNS section rather than a numeric offset.
const coinAndStampsSectionMap = [
  ["230", "178, Explanation (2)", "Meaning of coin", "The BNS refers to the Coinage Act, 2011 and also covers qualifying metal issued as money by a State or Sovereign Power. The separate IPC definition of Indian coin is not reproduced as a distinct offence category."],
  ["231", "178", "Counterfeiting coin", "Knowingly performing any part of the process of counterfeiting a coin is covered alongside revenue stamps, currency notes and bank notes. BNS 178 includes changing a genuine coin to look like a different coin."],
  ["232", "178", "Counterfeiting Indian coin", "The IPC's enhanced provision for Indian coin is consolidated into BNS 178, which does not create a separate Indian-coin counterfeiting tier."],
  ["233", "181", "Making or selling a counterfeiting instrument", "BNS 181 covers making, mending, buying, selling, disposing of or possessing machinery, dies, instruments or materials intended for counterfeiting coin, revenue stamps or notes."],
  ["234", "181", "Instrument for counterfeiting Indian coin", "The former Indian-coin-specific instrument rule is consolidated into BNS 181. Prove the purpose or knowledge concerning intended counterfeiting."],
  ["235", "181", "Possessing counterfeiting instruments or materials", "BNS 181 covers possession of machinery, instruments or materials for the proscribed purpose; the IPC's separate higher tier for Indian coin is not repeated."],
  ["236", "47 with 178", "Abetting abroad from India", "BNS 47 supplies the general rule for abetment in India of an act outside India that would be an offence here; read it with the counterfeiting offence in BNS 178. There is no stand-alone equivalent in BNS Chapter X."],
  ["237", "179", "Import or export of counterfeit coin", "BNS 179 combines knowing import and export of counterfeit coin with other dealing, trafficking and use as genuine."],
  ["238", "179", "Import or export of counterfeit Indian coin", "BNS 179 does not retain a separate Indian-coin import/export tier; knowledge or reason to believe the item counterfeit remains material."],
  ["239", "179", "Delivering counterfeit coin", "Delivering, selling or otherwise trafficking counterfeit coin while knowing or having reason to believe it counterfeit is within BNS 179. Compare the precise act alleged."],
  ["240", "179", "Delivering counterfeit Indian coin", "The Indian-coin-specific delivery offence joins the general coin, stamp and note dealing rule in BNS 179."],
  ["241", "179", "Passing coin discovered to be counterfeit", "A person who first received a coin innocently but later learns it is counterfeit may come within BNS 179 if they then use it as genuine or deal in it with the requisite knowledge or reason to believe."],
  ["242", "180", "Possessing counterfeit coin for use as genuine", "BNS 180 requires knowledge or reason to believe the coin counterfeit and an intention that it be used as genuine; it also recognises proof of a lawful source of possession."],
  ["243", "180", "Possessing counterfeit Indian coin", "BNS 180 combines Indian and other counterfeit coin with counterfeit stamps and notes; the requisite intended use and lawful-source explanation apply."],
  ["244", "187", "Mint worker changing coin weight or composition", "BNS 187 specifically covers a mint employee's act or legally prohibited omission intended to make a coin's weight or composition differ from the lawful standard."],
  ["245", "188", "Unlawfully taking a mint instrument", "Removing a coining tool or instrument from a lawfully established mint in India without authority remains a distinct BNS offence."],
  ["246", "178, Explanation (5)", "Diminishing coin weight or altering composition", "The BNS expressly treats diminishing a coin's weight or changing its composition as counterfeiting; assess the statutory counterfeiting elements."],
  ["247", "178, Explanation (5)", "Diminishing weight or changing Indian coin", "The IPC's Indian-coin-specific alteration rule is absorbed by the general BNS 178 definition of counterfeiting coin."],
  ["248", "178, Explanation (5)", "Changing a coin's appearance", "Altering appearance so a coin passes as a different coin is included in BNS 178's counterfeiting explanation."],
  ["249", "178, Explanation (5)", "Changing Indian coin appearance", "The separate Indian-coin appearance offence is consolidated into BNS 178, including the explanation about altered appearance."],
  ["250", "179", "Delivering an altered coin", "A coin altered in a manner amounting to counterfeiting is covered by BNS 179 when knowingly dealt in or used as genuine."],
  ["251", "179", "Delivering an altered Indian coin", "BNS 179 does not distinguish Indian coin from other coin for knowing dealing in an altered counterfeit coin."],
  ["252", "180", "Possessing an altered coin", "Where alteration makes the coin counterfeit, BNS 180 applies to possession with the requisite knowledge and intent that it be used as genuine."],
  ["253", "180", "Possessing an altered Indian coin", "The Indian-coin-specific possession rule is combined in BNS 180. Check the statutory intent and lawful-source explanation."],
  ["254", "179", "Passing a coin later discovered altered", "A person who acquired an altered coin innocently but later knows it to be counterfeit may come within BNS 179 on subsequently using it as genuine or dealing in it."],
  ["255", "178", "Counterfeiting Government stamp", "Counterfeiting a stamp issued by Government for revenue, including making a genuine stamp appear to have another denomination, is addressed in BNS 178."],
  ["256", "181", "Possessing stamp-counterfeiting instruments", "BNS 181 includes possession of a die, instrument or material intended to counterfeit revenue stamps."],
  ["257", "181", "Making or selling stamp-counterfeiting instruments", "BNS 181 also covers making, mending, buying, selling or disposing of machinery and instruments for that purpose."],
  ["258", "179", "Selling a counterfeit stamp", "BNS 179 covers selling or otherwise dealing in a counterfeit Government revenue stamp with knowledge or reason to believe it counterfeit."],
  ["259", "180", "Possessing a counterfeit stamp", "BNS 180 requires the specified knowledge and intended use as genuine; a proven lawful source is addressed in its explanation."],
  ["260", "179", "Using a counterfeit stamp as genuine", "Knowingly using a counterfeit Government revenue stamp as genuine falls within BNS 179."],
  ["261", "183", "Removing a used stamp or its writing", "BNS 183 covers fraudulently effacing writing on a stamped document or removing a used stamp so it can be used for another document."],
  ["262", "184", "Using a previously used stamp", "BNS 184 addresses fraudulent use of a Government revenue stamp known to have already been used."],
  ["263", "185", "Removing a stamp's used mark", "BNS 185 covers fraudulent removal of the mark denoting use, and specified knowing possession or disposal of such a stamp."],
  ["263A", "186", "Fictitious stamps", "BNS 186 retains the prohibition on fictitious postage stamps and materials for making them, with the lawful-excuse qualification, seizure and forfeiture rules."],
];

const coinAndStampsChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-15`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER XII  OF OFFENCES RELATING TO COIN AND GOVERNMENT STAMPS",
  slug: "unit-15-offences-relating-to-coin-and-government-stamps",
  shortDescription:
    "Map IPC Sections 230–263A to consolidated BNS Sections 178–188, including counterfeiting, dealing, possession, revenue stamps, mint offences and cross-border abetment.",
  chapterOverview:
    "IPC Chapter XII separates ordinary coin, Indian coin and Government stamp offences. BNS Chapter X, Sections 178–188, consolidates coin, revenue stamp, currency-note and bank-note offences. This chapter maps each supplied IPC provision to its closest substantive BNS rule, explains that IPC 236 is read with the general cross-border abetment rule in BNS 47, and distinguishes knowing dealing from possession intended for genuine use. BNS 182 concerns documents resembling notes and is not a direct counterpart of a provision in this supplied IPC chapter.",
  learningObjectives: [
    "Map every IPC provision from 230 to 263A to the relevant consolidated BNS rule.",
    "Explain the definition of coin and the treatment of altered weight, composition and appearance as counterfeiting.",
    "Distinguish counterfeiting under BNS 178, knowing dealing under 179, intended genuine use in possession under 180, and counterfeiting equipment under 181.",
    "Apply BNS 47 to abetment in India of counterfeiting outside India.",
    "Identify the distinct BNS rules for reused revenue stamps, fictitious postage stamps and mint employees.",
    "Recognise that BNS includes currency notes and bank notes and generally removes the IPC's separate Indian-coin tiers.",
  ],
  detailedContent: `CHAPTER XII — OF OFFENCES RELATING TO COIN AND GOVERNMENT STAMPS

Chapter Overview

IPC Chapter XII in the supplied material covers Sections 230–263A. BNS Chapter X combines coin, Government revenue stamp, currency-note and bank-note offences in Sections 178–188. Multiple IPC sections correspond to one BNS section; there is no reliable fixed number offset. Apply the law in force on the date of the alleged act and establish knowledge, reason to believe, intention and any statutory exception.

${coinAndStampsSectionMap.map(([ipc, bns, heading, explanation]) => `IPC Section ${ipc} → BNS Section ${bns}: ${heading}\n\n${explanation}`).join("\n\n")}

BNS Section 182: Related Rule Outside the Supplied IPC Chapter

BNS 182 punishes making or using a document resembling a currency-note or bank-note and includes rules about identifying who made it. This is part of BNS Chapter X but has no direct predecessor among the supplied IPC Sections 230–263A. Do not mistake BNS 182 for the counterpart to the IPC's mint offences: those are BNS 187 and 188.

Revision and Exam Method

For counterfeiting or coin alteration use BNS 178; for knowing import, export, delivery, sale or use as genuine use 179; for possession with knowledge and intent that the item be used as genuine use 180; for counterfeiting tools use 181. For reused or fictitious stamps use 183–186; for mint conduct use 187–188. IPC 236 additionally raises BNS 47 (abetment in India of conduct abroad) with BNS 178. First identify whether the object is a coin, revenue stamp, currency note or bank note; distinguish a revenue stamp from a fictitious postage stamp. The former IPC distinction between Indian coin and other coin cannot simply be carried into the BNS sentencing tiers.`,
  keyPoints: [
    "BNS Chapter X Sections 178–188 consolidate IPC Chapter XII coin and Government-stamp offences and add currency-note and bank-note coverage.",
    "IPC 230's coin definition corresponds to BNS 178 Explanation (2), which refers to the Coinage Act, 2011.",
    "IPC 231–232 and 246–249 map to BNS 178; alteration of weight, composition or appearance is expressly included in counterfeiting.",
    "IPC 237–241, 250–251, 254, 258 and 260 concern dealing or using as genuine under BNS 179.",
    "IPC 242–243, 252–253 and 259 concern possession with intended genuine use under BNS 180, subject to its lawful-source explanation.",
    "IPC 233–235 and 256–257 map to equipment and material offences in BNS 181.",
    "IPC 236 requires BNS 47 read with BNS 178; the BNS coin chapter has no separate provision for this cross-border abetment.",
    "IPC 261–263A map respectively to BNS 183–186; IPC 244–245 map to BNS 187–188.",
    "BNS 182 addresses note-like documents and has no direct counterpart in the supplied IPC chapter.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter XII, Sections 230–263A",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter X, Sections 178–188",
    "Bharatiya Nyaya Sanhita, 2023 — Section 47 (abetment in India of act abroad)",
    "Coinage Act, 2011 — Section 2 (definition referenced in BNS 178)",
  ].map((provision, index) => ({
    id: `unit-15-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for coin and Government-stamp offences.",
  })),
  examFocus:
    "Identify the type of coin, stamp or note and distinguish creating a counterfeit, knowingly dealing, possessing for use as genuine and making equipment. Group the IPC's ordinary/Indian coin variants under the correct BNS provision. For stamps distinguish revenue, previously used and fictitious postage stamps. Include BNS 47 for IPC 236 and BNS 182 as a related but non-equivalent rule; compare the date of conduct and statutory mental element.",
  revisionNotes:
    "IPC 230–232 → BNS 178; 233–235 → 181; 236 → 47 with 178; 237–241 → 179; 242–243 → 180; 244–245 → 187–188; 246–249 → 178; 250–251 → 179; 252–253 → 180; 254 → 179; 255 → 178; 256–257 → 181; 258 → 179; 259 → 180; 260 → 179; 261–263A → 183–186. BNS 182 covers note-like documents outside these supplied IPC sections.",
  chapterNumber: 14,
  displayOrder: 14,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const weightsAndMeasuresChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-16`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER XIII  OF OFFENCES RELATING TO WEIGHTS AND MEASURES",
  slug: "unit-16-offences-relating-to-weights-and-measures",
  shortDescription:
    "Study IPC Sections 264–267, why they have no direct BNS counterparts, and the relevant Legal Metrology Act provisions governing non-standard weights and measures.",
  chapterOverview:
    "IPC Chapter XIII contains four offences covering fraudulent use of a false weighing instrument, fraudulent use of a false weight or measure, possession for fraudulent use, and making or selling false measures. The BNS does not recreate this chapter or supply direct section-for-section equivalents. Current regulation of standards, use, keeping for use, alteration and manufacture or sale is principally found in the Legal Metrology Act, 2009, especially Sections 24–28 and 30. BNS Section 318 may apply to a deceptive transaction only when its independent cheating elements are proved; it is not the replacement number for any of these four IPC offences.",
  learningObjectives: [
    "State the ingredients of each IPC offence in Sections 264–267 and its maximum IPC punishment.",
    "Explain clearly that the BNS has no direct equivalent to IPC Chapter XIII.",
    "Locate related use, alteration, manufacture, sale and short-delivery rules in the Legal Metrology Act, 2009.",
    "Distinguish mere possession from keeping a non-standard measure for use or possessing it for sale under the specific law.",
    "Apply BNS Section 318 only when deception and the statutory inducement and harm elements of cheating are separately established.",
    "Check the date of conduct and the currently applicable amended Legal Metrology Act before stating a penalty.",
  ],
  detailedContent: `CHAPTER XIII — OF OFFENCES RELATING TO WEIGHTS AND MEASURES

Chapter Overview and BNS Position

The supplied IPC Chapter XIII consists of Sections 264–267. Each IPC offence was punishable by imprisonment of either description up to one year, fine, or both. The Bharatiya Nyaya Sanhita, 2023 has no chapter on false weights and measures and no direct successor section to any of these four provisions. Do not invent a BNS number or describe a related statute as an exact renumbering. The Legal Metrology Act, 2009 supplies the distinct present-day rules concerning standards and trade use. Examine the statute and amendments applicable on the date of the alleged conduct before stating a current penalty.

IPC Section 264 — Fraudulent Use of a False Weighing Instrument

Prove actual fraudulent use of an instrument for weighing and knowledge that the instrument is false. Simply finding an inaccurate scale does not by itself establish those IPC elements. There is no direct BNS equivalent. Under the Legal Metrology Act, Section 25 addresses use or keeping for use of a non-standard weight or measure; Section 26 addresses deceptive alteration of weights or measures; Section 24 concerns verification and stamping. The applicable provision depends on the instrument and conduct, and its elements need to be checked separately.

IPC Section 265 — Fraudulent Use of a False Weight or Measure

This covers fraudulent use of a false weight, length measure or capacity measure, and fraudulent use of one weight or measure as if it were another. The IPC focuses on fraud in actual use, not simply that a discrepancy exists. There is no direct BNS equivalent. Legal Metrology Act Section 25 addresses use of non-standard weights or measures; Section 28 concerns transactions contrary to prescribed standards, and Section 30 concerns delivering less than the contracted quantity or receiving an excess quantity in the transactions it specifies. Check the precise transaction and the statutory definitions before choosing among them.

IPC Section 266 — Possession of a False Weight or Measure

The IPC required possession of a weighing instrument, weight or measure known to be false and an intention that it may be fraudulently used. Possession alone was insufficient under this section. There is no direct BNS equivalent. Legal Metrology Act Section 25 includes keeping a non-standard weight or measure for use; Section 27 includes possession for sale of a non-standard weight or measure. They address different purposes and must not be assumed to criminalise every instance of possession.

IPC Section 267 — Making or Selling a False Weight or Measure

The maker or seller must know the instrument, weight or measure is false and make, sell or dispose of it so that it may be used as true, or knowing such use is likely. There is no direct BNS equivalent. Legal Metrology Act Section 27 addresses manufacturing, offering, exposing, possessing for sale or selling a non-standard weight or measure; Section 26 is relevant where an existing weight or measure is deceptively altered. The modern provisions use their own standards and exceptions, rather than the IPC's exact formula.

Related BNS Cheating Provision: Section 318

If a dishonest weighing transaction deceives someone and induces delivery of property or another act or omission with the statutory consequence, BNS Section 318 may also be relevant. Prove deception and inducement under that section independently. A non-standard scale, a short delivery or an administrative metrology violation is not automatically cheating.

Revision and Exam Method

IPC 264: fraudulent use of a known false weighing instrument. IPC 265: fraudulent use of a false or misrepresented weight or measure. IPC 266: knowing possession with intent for fraudulent use. IPC 267: knowing making, selling or disposing for use as true. BNS: no direct four-section mapping. Consult the Legal Metrology Act, 2009, particularly Sections 24–28 and 30, for analogous present-day controls, and BNS 318 only where separate cheating elements arise. First identify the act and mental element, then the applicable date and statute; do not carry the IPC punishment into a current Legal Metrology Act problem.`,
  keyPoints: [
    "IPC Chapter XIII Sections 264–267 have no direct BNS counterparts.",
    "IPC 264 requires fraudulent use of a weighing instrument known to be false.",
    "IPC 265 covers fraudulent use of a false weight or measure, or use of one as another.",
    "IPC 266 requires knowing possession and intended fraudulent use; possession alone is insufficient.",
    "IPC 267 addresses knowing manufacture or sale with intended or likely use as true.",
    "Legal Metrology Act 25 concerns use or keeping for use; 26 alteration; 27 manufacture or sale; 28 and 30 specified transactions.",
    "BNS 318 is a separate cheating offence requiring its own proof of deception and inducement, not a one-to-one replacement.",
    "Check current amendments and the date of conduct before stating present-day penalties.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter XIII, Sections 264–267 (historical offences)",
    "Legal Metrology Act, 2009 — Sections 24–28 and 30 (related, non-identical rules)",
    "Bharatiya Nyaya Sanhita, 2023 — Section 318 (cheating, only if its independent elements are met)",
    "Bharatiya Nyaya Sanhita, 2023 — no direct counterparts to IPC Sections 264–267",
  ].map((provision, index) => ({
    id: `unit-16-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Statutory reading for weights, measures and related deceptive transactions.",
  })),
  examFocus:
    "Explain each historical IPC offence's act and mental state separately. State explicitly that IPC 264–267 have no direct BNS equivalents. Compare the relevant Legal Metrology Act provision without treating it as identical; use BNS 318 only where deception, inducement and the required consequence are proved. Specify the date and applicable version of the law before discussing punishment.",
  revisionNotes:
    "IPC 264: known false weighing instrument used fraudulently; 265: false weight or measure used fraudulently; 266: knowing possession with intent for fraudulent use; 267: knowing manufacture or sale for use as true. No direct BNS successors. Related Legal Metrology Act 24 (verification), 25 (use/keep for use), 26 (alteration), 27 (manufacture/sale), 28 and 30 (transactions). BNS 318 only for separately proved cheating.",
  chapterNumber: 15,
  displayOrder: 15,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const publicHealthSafetySectionMap = [
  ["268", "270", "Public nuisance", "A common injury, danger or annoyance to the public, or obstruction of a public right, remains the defining rule. Convenience to some does not excuse the nuisance."],
  ["269", "271", "Negligent spread of dangerous infection", "An unlawful or negligent act likely to spread a disease dangerous to life requires knowledge or reason to believe in that likelihood."],
  ["270", "272", "Malignant spread of dangerous infection", "The malignant act and awareness of likely infection distinguish this from the negligent offence in BNS 271."],
  ["271", "273", "Disobedience to quarantine rule", "The BNS extends the transport wording from vessels to any mode of transport, while retaining knowing disobedience of a Government rule."],
  ["272", "274", "Adulteration of food or drink", "Making food or drink noxious for intended or likely sale is retained; the BNS fine ceiling is ₹5,000."],
  ["273", "275", "Sale of noxious food or drink", "Sale, offer or exposure for sale of unfit food or drink requires knowledge or reason to believe it noxious; the BNS fine ceiling is ₹5,000."],
  ["274", "276", "Adulteration of drugs", "Adulterating a medicine for intended or likely medicinal sale or use is retained; BNS increases the imprisonment ceiling to one year and the fine ceiling to ₹5,000."],
  ["275", "277", "Sale of adulterated drugs", "Knowing sale, offer, dispensing or medicinal use of an adulterated drug is retained with a BNS fine ceiling of ₹5,000."],
  ["276", "278", "Sale of a drug as a different drug", "Knowingly passing one drug or medical preparation off as another is retained; the BNS fine ceiling is ₹5,000."],
  ["277", "279", "Fouling a public spring or reservoir", "Voluntarily making the water less fit for its ordinary use is retained; BNS allows six months' imprisonment or a fine up to ₹5,000 or both."],
  ["278", "280", "Making the atmosphere noxious", "Voluntarily vitiating air to the detriment of people nearby or using a public way is retained with a fine up to ₹1,000."],
  ["279", "281", "Rash driving or riding", "The public-way danger or likely injury test remains; distinguish this offence from causing death by negligence."],
  ["280", "282", "Rash navigation of a vessel", "Rash or negligent navigation endangering life or likely to cause injury is retained with a fine ceiling of ₹10,000."],
  ["281", "283", "False light, mark or buoy", "Exhibiting a misleading navigational signal with the required intent or knowledge is retained; BNS requires a fine of at least ₹10,000 along with the stated imprisonment."],
  ["282", "284", "Unsafe or overloaded hired vessel", "Knowingly or negligently carrying a person for hire by water in a vessel endangering that person's life is retained."],
  ["283", "285", "Danger or obstruction in a public way", "An act or omission concerning property in one's charge that causes public-way or navigation danger, obstruction or injury remains covered; the BNS fine ceiling is ₹5,000."],
  ["284", "286", "Negligent conduct with poison", "Rash or negligent handling, or failure to guard a poisonous substance in one's possession, remains covered."],
  ["285", "287", "Negligent conduct with fire", "Rash or negligent handling of fire or combustible matter, or failure to guard it, remains covered."],
  ["286", "288", "Negligent conduct with explosives", "Rash or negligent handling, or failure to guard an explosive substance, remains covered."],
  ["287", "289", "Negligent conduct with machinery", "Rash or negligent machine use, or failure to guard machinery in one's possession or care, remains covered."],
  ["288", "290", "Unsafe building work", "The BNS expressly adds constructing buildings to the IPC's pulling down or repairing; prove the omitted safeguards against a probable fall."],
  ["289", "291", "Negligent conduct with an animal", "Failure to take sufficient precautions with an animal in one's possession against probable danger to life or grievous hurt remains covered."],
  ["290", "292", "Residual punishment for public nuisance", "This applies to a public nuisance not otherwise punishable by the BNS; the BNS fine ceiling is ₹1,000."],
  ["291", "293", "Continuing nuisance after injunction", "Repeating or continuing a nuisance despite an injunction by an authorised public servant remains a separate offence."],
  ["292", "294", "Sale and circulation of obscene material", "The BNS expressly includes display of content in electronic form; apply the whole-work test, listed activities and public-good or religious exceptions."],
  ["293", "295", "Obscene objects supplied to a child", "The IPC referred to a person under twenty; BNS uses child, defined in BNS Section 2(3) as a person below eighteen."],
  ["294", "296", "Obscene acts and songs", "An obscene public act or words or song in or near a public place must cause annoyance to others."],
  ["294A", "297", "Keeping an unauthorised lottery office", "BNS 297(1) addresses keeping the office; subsection (2) separately covers publishing specified proposals tied to the lottery."],
];

const publicHealthSafetyChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-17`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER XIV  OF OFFENCES AFFECTING THE PUBLIC HEALTH, SAFETY, CONVENIENCE, DECENCY AND MORALS",
  slug: "unit-17-public-health-safety-convenience-decency-and-morals",
  shortDescription:
    "Compare IPC Chapter XIV Sections 268–294A with BNS Chapter XV Sections 270–297, including nuisance, public safety, obscenity and lotteries.",
  chapterOverview:
    "The supplied historical IPC chapter maps substantially to BNS Chapter XV, Sections 270–297. It covers public nuisance, infectious disease and quarantine, unsafe food and drugs, water and air, rash driving and navigation, hazardous substances, animals, obscene material and lotteries. The central BNS changes some scope, ages and penalties; the Himachal Pradesh and Odisha state amendments in the supplied text must be considered separately.",
  learningObjectives: [
    "Match every supplied central IPC provision from 268 through 294A to its BNS counterpart.",
    "Distinguish public nuisance as defined in BNS 270 from its residual punishment in 292 and continued nuisance in 293.",
    "Compare negligence and malignancy in infection offences and identify the expanded transport wording in the quarantine offence.",
    "Identify changes to buildings, electronic obscenity and the age threshold for supplying obscene material to a child.",
    "Explain why the state-specific IPC amendments do not automatically become central BNS provisions.",
  ],
  detailedContent: `CHAPTER XIV — OF OFFENCES AFFECTING THE PUBLIC HEALTH, SAFETY, CONVENIENCE, DECENCY AND MORALS

Chapter Overview

The attachment sets out IPC Chapter XIV, Sections 268–294A. Its central provisions correspond to BNS Chapter XV, Sections 270–297. The BNS has its own wording and penalties: use the statute applicable on the date of the conduct, rather than assuming that a matching heading makes every element identical. The comparison below follows the supplied IPC text and the central Bharatiya Nyaya Sanhita, 2023.

${publicHealthSafetySectionMap.map(([ipc, bns, heading, explanation]) => `IPC Section ${ipc} → BNS Section ${bns}: ${heading}\n\n${explanation}`).join("\n\n")}

State Amendments in the Supplied Text

Himachal Pradesh IPC Section 289-A concerns feeding monkeys in specified public places. It is a state amendment, not an extra central provision between BNS Sections 291 and 292, and has no identified direct central BNS counterpart. The supplied Odisha IPC Section 292-A and its amendments to IPC Sections 292 and 293 concern indecent or scurrilous matter and the state-specific penalties and scope. They are not reproduced as separate central BNS Sections 294-A or 295-A. Check the applicable state's current legislation before asserting whether any state amendment continues or has been replaced.

Exam Method

Identify the precise act, required awareness or negligence, likely danger or annoyance, and whether the item involves food, medicine, navigation, a public way or obscene material. Map IPC 268–294 to BNS 270–296 respectively, and IPC 294A to BNS 297. For IPC 289-A and 292-A, flag the state-specific status. Note the express BNS additions for any mode of transport (273), construction (290), electronic display (294), and child below eighteen (295). Compare penalties under the law applicable to the date of the alleged offence.`,
  keyPoints: [
    "IPC Chapter XIV Sections 268–294 map in order to BNS Chapter XV Sections 270–296; IPC 294A maps to BNS 297.",
    "BNS 270 defines public nuisance; BNS 292 punishes otherwise unpunished nuisance; BNS 293 addresses nuisance continued after an injunction.",
    "BNS 273 refers to any mode of transport for quarantine, and BNS 290 includes construction work.",
    "BNS 294 expressly covers display of content in electronic form and retains the stated public-good and religious exceptions.",
    "BNS 295 uses child (below eighteen under BNS 2(3)); the supplied IPC 293 uses under twenty.",
    "Himachal Pradesh IPC 289-A and Odisha IPC 292-A are state amendments, with no separately numbered central BNS counterpart in Chapter XV.",
    "Compare the current BNS punishment separately: multiple fine limits and the drug-adulteration imprisonment limit differ from the supplied IPC text.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter XIV, Sections 268–294A (historical central provisions)",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter XV, Sections 270–297",
    "Bharatiya Nyaya Sanhita, 2023 — Section 2(3) (child)",
    "Supplied state amendments — Himachal Pradesh IPC 289-A; Odisha IPC 292-A and amendments to 292–293 (verify current local law)",
  ].map((provision, index) => ({
    id: `unit-17-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Statutory reading for public health, safety, convenience, decency and morals.",
  })),
  examFocus:
    "Map the central sections accurately, then compare the elements and applicable penalties. Separate BNS 270's nuisance definition from punishments in 292–293; contrast IPC 269/270 and BNS 271/272; identify the expanded wording for transport, construction and electronic content; distinguish the age thresholds; treat the Himachal Pradesh and Odisha additions as state-specific issues requiring current-law verification.",
  revisionNotes:
    "IPC 268–294 → BNS 270–296 in sequence; IPC 294A → BNS 297. BNS Chapter XV covers public health, safety, convenience, decency and morals. Watch BNS 273 (any mode of transport), 276 (drug adulteration: up to one year), 290 (construction), 294 (electronic form), 295 (child under eighteen), and state-only IPC 289-A / 292-A.",
  chapterNumber: 16,
  displayOrder: 16,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const religionOffencesChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-18`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER XV  OF OFFENCES RELATING TO RELIGION",
  slug: "unit-18-offences-relating-to-religion",
  shortDescription:
    "Compare IPC Chapter XV Sections 295–298 with BNS Chapter XVI Sections 298–302, including religious places, malicious insults, assemblies, burial places and deliberate words or gestures.",
  chapterOverview:
    "The supplied IPC Chapter XV contains Sections 295, 295A, 296, 297 and 298. BNS Chapter XVI retains their core offences in Sections 298, 299, 300, 301 and 302 respectively. The comparison focuses on the distinct intent or knowledge required for each offence, the express reference to electronic means in BNS 299 and the unchanged stated imprisonment ceilings.",
  learningObjectives: [
    "Map all five supplied IPC sections to BNS Sections 298–302.",
    "Identify the intent to insult or knowledge of likely insult required for damaging a place of worship or sacred object.",
    "Distinguish deliberate and malicious intention to outrage a class's religious feelings from deliberate intention to wound one person's religious feelings.",
    "Explain how BNS 299 expressly covers electronic means and how BNS 300–301 protect lawful assemblies and funerary places or rites.",
    "Apply the statute in force on the date of the alleged conduct and assess each offence's specific act and mental element.",
  ],
  detailedContent: `CHAPTER XV — OF OFFENCES RELATING TO RELIGION

Chapter Overview

The supplied historical IPC Chapter XV maps to BNS Chapter XVI. The five central provisions are IPC 295 → BNS 298, IPC 295A → BNS 299, IPC 296 → BNS 300, IPC 297 → BNS 301, and IPC 298 → BNS 302. The BNS headings do not create a general offence of disagreeing with religious views; apply the specific conduct and mental-state requirements in each provision. Compare the date of the act with the applicable IPC or BNS regime.

IPC Section 295 → BNS Section 298: Injuring or Defiling a Place of Worship

The offence covers destroying, damaging or defiling a place of worship or an object held sacred by a class of persons. Prove intention to insult that class's religion, or knowledge that the class is likely to consider the act an insult. BNS 298 retains imprisonment of either description up to two years, fine, or both. Mere accidental damage without the specified mental element does not establish this offence.

IPC Section 295A → BNS Section 299: Deliberate and Malicious Insult

This provision requires deliberate and malicious intention to outrage the religious feelings of a class of citizens of India, coupled with insulting or attempting to insult its religion or beliefs. BNS 299 expressly includes conduct through electronic means alongside spoken or written words, signs, visible representations or otherwise. Its stated punishment remains imprisonment of either description up to three years, fine, or both. Keep this higher specific intent separate from the knowledge alternative in BNS 298 and the personal intention in BNS 302.

IPC Section 296 → BNS Section 300: Disturbing a Religious Assembly

Voluntarily causing disturbance to an assembly lawfully engaged in worship or religious ceremonies remains covered. Establish a lawful assembly engaged in those activities and a voluntary disturbance. BNS 300 retains imprisonment of either description up to one year, fine, or both.

IPC Section 297 → BNS Section 301: Trespass, Burial Places and Funeral Rites

The provision covers trespass in a place of worship, place of sepulture or location set apart for funeral rites or remains, indignity to a human corpse, and disturbance of people assembled for funeral ceremonies. It requires intention to wound feelings or insult religion, or knowledge that those consequences are likely. BNS 301 retains imprisonment of either description up to one year, fine, or both. Do not treat every entry into a cemetery or every interruption as sufficient without the statutory conduct and mental element.

IPC Section 298 → BNS Section 302: Words, Sounds, Gestures or Objects

Uttering words or making sounds in a person's hearing, making gestures in that person's sight, or placing an object in that person's sight is covered when done with deliberate intention to wound that person's religious feelings. BNS 302 retains imprisonment of either description up to one year, fine, or both. This provision concerns the feelings of a person; BNS 299 addresses a class and requires deliberate and malicious intention to outrage its religious feelings.

Revision and Exam Method

Identify the protected context first: sacred place or object (298), a class's religion or beliefs (299), lawful assembly (300), burial or funeral setting (301), or words and gestures directed at a person's religious feelings (302). Next state the precise act, intention or knowledge and the IPC/BNS number pair. Mention electronic means specifically for BNS 299; do not assume that a religious disagreement alone satisfies the statutory ingredients.`,
  keyPoints: [
    "IPC 295 → BNS 298: damage or defilement of worship place or sacred object with intent to insult or knowledge of likely insult.",
    "IPC 295A → BNS 299: deliberate and malicious intention to outrage a class's religious feelings; electronic means expressly included.",
    "IPC 296 → BNS 300: voluntary disturbance of an assembly lawfully engaged in worship or ceremonies.",
    "IPC 297 → BNS 301: specified trespass, indignity to a corpse or funeral disturbance with the required intention or knowledge.",
    "IPC 298 → BNS 302: words, sounds, gestures or objects with deliberate intention to wound a person's religious feelings.",
    "The stated maximum imprisonment terms are two years for BNS 298, three years for 299, and one year each for 300–302.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter XV, Sections 295, 295A, 296–298 (historical)",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter XVI, Sections 298–302",
  ].map((provision, index) => ({
    id: `unit-18-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Core statutory reading for offences relating to religion.",
  })),
  examFocus:
    "Set out the five IPC-to-BNS pairs, distinguish damage to sacred property from expressions targeting a class or a person, and identify each required mental element. State that BNS 299 expressly includes electronic means. For an assembly, burial or funeral fact pattern, test the exact protected setting and conduct before discussing punishment.",
  revisionNotes:
    "295 → 298 (place or sacred object); 295A → 299 (deliberate and malicious insult of class, including electronic means); 296 → 300 (lawful religious assembly); 297 → 301 (burial, corpse and funeral); 298 → 302 (deliberate words, sounds, gestures or object directed at person). BNS Chapter XVI Sections 298–302.",
  chapterNumber: 17,
  displayOrder: 17,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

const humanBodySectionMap = [
  // Offences affecting life; the dowry-death provision moves to BNS Chapter V.
  ["299", "100", "Culpable homicide"],
  ["300", "101", "Murder and its exceptions"],
  ["301", "102", "Death of a person other than the intended victim"],
  ["302", "103", "Punishment for murder"],
  ["303", "104", "Murder by a life convict"],
  ["304", "105", "Culpable homicide not amounting to murder"],
  ["304A", "106(1)", "Causing death by negligence"],
  ["304-AA (Himachal Pradesh)", "No direct central counterpart", "State amendment on intoxicated driving causing death or injury"],
  ["304B", "80", "Dowry death; moved to offences against women"],
  ["305", "107", "Abetment of suicide of a child or person of unsound mind"],
  ["306", "108", "Abetment of suicide"],
  ["307", "109", "Attempt to murder"],
  ["308", "110", "Attempt to commit culpable homicide"],
  ["309", "No general counterpart", "Attempt to commit suicide; see the narrower BNS 226"],
  ["310", "No direct counterpart", "The IPC thug definition is omitted"],
  ["311", "No direct counterpart", "The IPC punishment for thug is omitted"],
  // Miscarriage, unborn children, abandonment and concealment move to BNS Chapter V.
  ["312", "88", "Causing miscarriage"],
  ["313", "89", "Causing miscarriage without consent"],
  ["314", "90", "Death caused by act intended to cause miscarriage"],
  ["315", "91", "Preventing live birth or causing death after birth"],
  ["316", "92", "Death of quick unborn child by act amounting to culpable homicide"],
  ["317", "93", "Exposure and abandonment of child under twelve"],
  ["318", "94", "Concealment of birth by secret disposal of body"],
  // Hurt and aggravated hurt are consolidated into BNS sections and subsections.
  ["319", "114", "Hurt"],
  ["320", "116", "Grievous hurt"],
  ["321", "115(1)", "Voluntarily causing hurt"],
  ["322", "117(1)", "Voluntarily causing grievous hurt"],
  ["323", "115(2)", "Punishment for voluntarily causing hurt"],
  ["324", "118(1)", "Hurt by dangerous weapons or means"],
  ["325", "117(2)", "Punishment for voluntarily causing grievous hurt"],
  ["326", "118(2)", "Grievous hurt by dangerous weapons or means"],
  ["326A", "124(1)", "Grievous hurt by use of acid"],
  ["326B", "124(2)", "Throwing or attempting to throw acid"],
  ["327", "119(1)", "Hurt to extort property or compel an illegal act"],
  ["328", "123", "Hurt by poison with intent to commit an offence"],
  ["329", "119(2)", "Grievous hurt to extort property or compel an illegal act"],
  ["330", "120(1)", "Hurt to extort confession or restoration of property"],
  ["331", "120(2)", "Grievous hurt to extort confession or restoration of property"],
  ["332", "121(1)", "Hurt to deter a public servant"],
  ["333", "121(2)", "Grievous hurt to deter a public servant"],
  ["334", "122(1)", "Hurt on grave and sudden provocation"],
  ["335", "122(2)", "Grievous hurt on grave and sudden provocation"],
  ["336", "125", "Rash or negligent act endangering life or personal safety"],
  ["337", "125(a)", "Hurt caused by an endangering act"],
  ["338", "125(b)", "Grievous hurt caused by an endangering act"],
  // Restraint and confinement definitions and punishments are grouped together.
  ["339", "126(1)", "Wrongful restraint"],
  ["340", "127(1)", "Wrongful confinement"],
  ["341", "126(2)", "Punishment for wrongful restraint"],
  ["342", "127(2)", "Punishment for wrongful confinement"],
  ["343", "127(3)", "Confinement for three or more days"],
  ["344", "127(4)", "Confinement for ten or more days"],
  ["345", "127(5)", "Confinement despite a writ for liberation"],
  ["346", "127(6)", "Secret wrongful confinement"],
  ["347", "127(7)", "Confinement to extort property or compel an illegal act"],
  ["348", "127(8)", "Confinement to extort confession or restore property"],
  // The woman-specific offences are now in BNS Chapter V.
  ["349", "128", "Force"],
  ["350", "129", "Criminal force"],
  ["351", "130", "Assault"],
  ["352", "131", "Punishment for assault or criminal force"],
  ["353", "132", "Assault or criminal force to deter a public servant"],
  ["354", "74", "Assault or force with intent to outrage a woman's modesty"],
  ["354A", "75", "Sexual harassment"],
  ["354B", "76", "Assault or force with intent to disrobe"],
  ["354C", "77", "Voyeurism"],
  ["354D", "78", "Stalking"],
  ["354E (Chhattisgarh)", "No direct central counterpart", "State amendment on failing to prevent or report specified offences"],
  ["355", "133", "Assault or force with intent to dishonour"],
  ["356", "134", "Assault or force in attempted theft from a person"],
  ["357", "135", "Assault or force in attempted wrongful confinement"],
  ["358", "136", "Assault or force on grave provocation"],
  // Kidnapping is consolidated; several offences concerning women and children move.
  ["359", "137(1)", "Kinds of kidnapping"],
  ["360", "137(1)(a)", "Kidnapping from India"],
  ["361", "137(1)(b)", "Kidnapping from lawful guardianship"],
  ["362", "138", "Abduction"],
  ["363", "137(2)", "Punishment for kidnapping"],
  ["363A", "139", "Kidnapping or maiming child for begging"],
  ["364", "140(1)", "Kidnapping or abduction in order to murder"],
  ["364A", "140(2)", "Kidnapping for ransom"],
  ["365", "140(3)", "Kidnapping or abduction for secret confinement"],
  ["366", "87", "Kidnapping or inducing woman to compel marriage"],
  ["366A", "96", "Procuration of child"],
  ["366B", "141", "Importation of girl or boy from abroad"],
  ["367", "140(4)", "Kidnapping to subject person to grievous hurt or slavery"],
  ["368", "142", "Concealing or confining kidnapped or abducted person"],
  ["369", "97", "Kidnapping child under ten to steal from the child"],
  ["370", "143", "Trafficking of person"],
  ["370A", "144", "Exploitation of trafficked person"],
  ["371", "145", "Habitual dealing in slaves"],
  ["372", "98", "Selling child for prostitution, etc."],
  ["373", "99", "Buying child for prostitution, etc."],
  ["374", "146", "Unlawful compulsory labour"],
  // Sexual offences formerly in IPC Chapter XVI now appear in BNS Chapter V.
  ["375", "63", "Rape definition"],
  ["376", "64; 65(1) for IPC 376(3)", "Punishment for rape and the under-sixteen case"],
  ["376A", "66", "Rape causing death or persistent vegetative state"],
  ["376AB", "65(2)", "Rape of woman under twelve"],
  ["376B", "67", "Sexual intercourse by husband during separation"],
  ["376C", "68", "Sexual intercourse by person in authority"],
  ["376D", "70(1)", "Gang rape"],
  ["376DA", "70(2)", "Gang rape of woman under sixteen; BNS uses under-eighteen tier"],
  ["376DB", "70(2)", "Gang rape of woman under twelve; BNS uses under-eighteen tier"],
  ["376E", "71", "Repeat offender"],
  ["376F (Chhattisgarh)", "No direct central counterpart", "State amendment on failing to prevent or report rape at workplace"],
  ["377", "No direct counterpart", "The general IPC unnatural-offences section is omitted from BNS"],
];

const humanBodyChapter = createChapterModel({
  id: `${CRIMINAL_LAW_I_COURSE_ID}-unit-19`,
  courseId: CRIMINAL_LAW_I_COURSE_ID,
  title: "CHAPTER XVI  OF OFFENCES AFFECTING THE HUMAN BODY",
  slug: "unit-19-offences-affecting-the-human-body",
  shortDescription:
    "Map the supplied IPC Sections 299–377 to BNS Chapters V, VI and XIII, with special attention to consolidated provisions, relocated offences and omissions.",
  chapterOverview:
    "The supplied IPC Chapter XVI ranges from culpable homicide and hurt to confinement, assault, kidnapping, trafficking and sexual offences. BNS reorganises these subjects across Chapter V (women and children), Chapter VI (human body), and the narrower attempt-to-compel-public-servant suicide rule in Chapter XIII. This chapter gives a provision-level crosswalk, explains key elements and distinguishes omitted IPC offences from BNS additions.",
  learningObjectives: [
    "Distinguish culpable homicide, murder, their exceptions, negligent death and attempts by the relevant IPC and BNS sections.",
    "Find miscarriage, dowry death, sexual offences and woman- and child-specific provisions in BNS Chapter V.",
    "Map hurt, grievous hurt, acid attacks, restraint, confinement, force and assault to consolidated BNS sections and subsections.",
    "Explain the separation of kidnapping, abduction, ransom, trafficking and compulsory labour under BNS.",
    "Identify IPC 309, 310–311 and 377 as lacking direct general BNS counterparts, and note the narrower rule in BNS 226.",
    "Treat supplied state amendments separately and check applicable law and commencement date before stating penalties.",
  ],
  detailedContent: `CHAPTER XVI — OF OFFENCES AFFECTING THE HUMAN BODY

Chapter Overview

This supplied IPC chapter spans Sections 299–377, with several lettered sections and state amendments. BNS does not keep all these topics together: BNS Chapter V covers offences against women and children (including rape and miscarriage), Chapter VI covers offences affecting the human body (Sections 100–146), and BNS 226 in Chapter XIII addresses only an attempt to commit suicide to compel or restrain a public servant from exercising lawful power. Read the exact provision in force at the time of conduct; no fixed numerical offset applies.

IPC to BNS Section Crosswalk

${humanBodySectionMap.map(([ipc, bns, topic]) => `IPC ${ipc} → BNS ${bns}: ${topic}`).join("\n")}

Life, Death and Suicide

IPC 299–301 correspond to BNS 100–102. BNS 101 sets out when culpable homicide amounts to murder and retains the specified exceptions; distinguish intention to kill, intention to cause particular injury, knowledge of likely death and the exception's conditions. Punishment provisions move from IPC 302–304 to BNS 103–105. BNS 103(2) also addresses murder by a group of five or more on listed grounds. IPC 304A maps to BNS 106(1), whose stated general term differs; BNS 106(2) is a separate text concerning rash or negligent driving and failure to report, and its commencement must be checked before treating it as operative. IPC 304B dowry death moves to BNS 80. IPC 305–308 map to BNS 107–110. The broad IPC 309 offence is not retained; BNS 226 is confined to an attempt to commit suicide with the purpose of compelling or restraining a public servant in the exercise of lawful power. IPC 310–311's distinct thug provisions have no direct BNS counterparts; BNS 111–113 address new organised-crime and terrorist offences with their own elements, not renumbered versions of thug.

Miscarriage and Children

IPC 312–318 map to BNS 88–94 in Chapter V, preserving separate tests for consent, resulting death, harm to an unborn child, abandonment and concealing birth. The supplied IPC 366A, 369 and 372–373 map to BNS 96–99; BNS 95 adds the distinct offence of hiring, employing or engaging a child to commit an offence. BNS 96 and 141 change the coverage from the IPC's girl-specific wording: examine the child, age, origin and intention requirements in the actual BNS provisions.

Hurt, Restraint, Force and Assault

IPC 319–338 map largely to BNS 114–125. Definitions and punishment are combined: ordinary hurt in 115, grievous hurt in 117, dangerous weapons in 118, acid in 124 and rash or negligent endangerment in 125. Use the correct subsection, injury threshold, instrument and intent. IPC 339–348 become BNS 126–127; BNS 127(3)–(8) retains the duration and purpose-based confinement variants. IPC 349–358 become BNS 128–136 except IPC 354 and 354A–354D, which move to BNS 74–78 on offences against women. Force, criminal force and assault are distinct concepts; a gesture can amount to assault even before physical force is applied.

Kidnapping, Trafficking and Labour

IPC 359–363 are reorganised into BNS 137–138. IPC 363A and 364–365 map to BNS 139–140; BNS 140(1)–(4) combines murder, ransom, secret confinement and grievous-hurt or slavery purposes. IPC 366 moves to BNS 87, IPC 366A to 96, IPC 366B to 141, and IPC 367–374 divide among BNS 140(4), 142–146, 97–99 as shown above. Distinguish kidnapping from lawful guardianship, abduction by force or deceit, trafficking by its specified means and exploitation, and unlawful compelled labour.

Sexual Offences and Omitted Provision

IPC 375–376E in the supplied material move principally to BNS 63–71 in Chapter V. BNS 63 states the rape definition and consent rules, BNS 64–66 and 70–71 differentiate punishment by circumstance, age, harm, gang rape and prior conviction. BNS 69 is a new offence concerning specified deceitful means; it is not an alternative number for IPC 376C. The old IPC 377 general unnatural-offences provision has no direct BNS successor. Do not imply that every act historically covered by IPC 377 is automatically covered by a different BNS section; examine the elements of any potentially applicable specific law separately.

State Amendments and Exam Method

The attachment includes state-specific additions or changes from Himachal Pradesh (including IPC 304-AA), Maharashtra, Chhattisgarh (including IPC 354E and 376F), Arunachal Pradesh and adaptations for Jammu and Kashmir and Ladakh. These are not automatically central BNS provisions and may need separate current local-law analysis. For an exam problem, identify the date, person, act, mental element, consequence, age and any specific exception; find the correct BNS chapter and subsection using the crosswalk. Check the latest applicable central and local text and commencement before asserting penalties.`,
  keyPoints: [
    "IPC 299–308 mostly map to BNS 100–110; dowry death IPC 304B is BNS 80 and negligent death IPC 304A is BNS 106(1).",
    "IPC 312–318 move to BNS 88–94 on miscarriage, unborn children, abandonment and concealment.",
    "Hurt and confinement provisions are consolidated into BNS 114–127; use subsection references for specific injuries and purposes.",
    "IPC 354 and 354A–354D map to BNS 74–78, and IPC 375–376E primarily to BNS 63–71.",
    "IPC 359–374 maps across BNS 87, 96–99 and 137–146; kidnapping, ransom, trafficking and child offences require their specific elements.",
    "IPC 309 has no broad equivalent; BNS 226 is narrower. IPC 310–311 and 377 have no direct BNS counterparts.",
    "State-specific amendments in the supplied text require independent verification of current state law.",
  ],
  statutoryProvisions: [
    "Indian Penal Code, 1860 — Chapter XVI, Sections 299–377 and supplied lettered provisions (historical)",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter V, Sections 63–99 (reorganised women and children offences)",
    "Bharatiya Nyaya Sanhita, 2023 — Chapter VI, Sections 100–146 (offences affecting human body)",
    "Bharatiya Nyaya Sanhita, 2023 — Section 226 (specific attempt to commit suicide to compel public servant)",
  ].map((provision, index) => ({
    id: `unit-19-provision-${index + 1}`,
    title: provision,
    provision,
    description: "Statutory reading for offences affecting the human body.",
  })),
  examFocus:
    "Begin with the date and facts, then find the matching offence and subsection, not a numerical offset. Separate homicide from negligent death; distinguish hurt from grievous hurt, kidnapping from abduction, rape and other specific sexual offences, and identify exceptions or mental states. Explain reorganised provisions, the narrower BNS 226 and the omitted IPC thug and 377 provisions.",
  revisionNotes:
    "Life: 299–308 → 100–110 except 304B → 80; 304A → 106(1). Miscarriage/children: 312–318 → 88–94. Hurt: 319–338 → 114–125 with subsection consolidation. Restraint/confinement: 339–348 → 126–127. Force/assault: 349–358 → 128–136 except 354–354D → 74–78. Kidnapping/trafficking: 359–374 → 87, 96–99, 137–146. Rape: 375–376E → 63–71. IPC 309, 310–311 and 377 have no direct general BNS equivalents.",
  chapterNumber: 18,
  displayOrder: 18,
  quizRequired: true,
  passingPercentage: 80,
  maximumAttempts: 3,
  published: true,
  status: "published",
  previewAvailable: false,
});

export const criminalLawIChapters = [
  ...existingCriminalLawIChapters.slice(0, 6),
  stateOffencesChapter,
  existingCriminalLawIChapters[6],
  publicTranquillityChapter,
  publicServantsChapter,
  electionOffencesChapter,
  lawfulAuthorityChapter,
  publicJusticeChapter,
  coinAndStampsChapter,
  weightsAndMeasuresChapter,
  publicHealthSafetyChapter,
  religionOffencesChapter,
  humanBodyChapter,
  propertyOffencesChapter,
  documentOffencesChapter,
  serviceOffencesChapter,
  marriageOffencesChapter,
  crueltyOffencesChapter,
  defamationOffencesChapter,
  intimidationOffencesChapter,
  attemptOffencesChapter,
];
