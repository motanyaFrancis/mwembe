export type Issue = {
    id: number;
    title: string;
    slug: string;
    description: string; // for main text
    invocation?: string;  // introductory sentence(s)
    points?: string[];    // bullet points
    conclusion?: string;  // final statement
};

export const issues: Issue[] = [
    {
        id: 1,
        title: "Inclusivity",
        slug: "inclusivity",
        invocation: "Inclusivity is the foundation of a strong and progressive Institution. As President, I will:",
        points: [
            "Champion gender equity, youth participation, and inclusion of persons living with disabilities",
            "Strengthen programs for graduate engineers, technologists, technicians, and students",
            "Institutionalize recognition of Eminent Engineers",
            "Expand women-focused initiatives such as the She-Program",
            "Advocate for engineers’ representation on boards, committees, and national platforms",
        ],
        conclusion: "An inclusive IEK is a stronger, more relevant IEK.",
        description:
            `Inclusivity is the foundation of a strong and progressive Institution. As President, I will champion gender equity, youth participation, and inclusion of persons living with disabilities. I will also strengthen programs for graduate engineers, technologists, technicians, and students, while expanding women-focused initiatives such as the She-Program. An inclusive IEK is a stronger, more relevant IEK.`,
    },
    {
        id: 2,
        title: "Good Governance",
        slug: "good-governance",
        invocation: "Strong institutions are built on trust, transparency, and accountability. I will:",
        points: [
            "Uphold strict adherence to the IEK Constitution and governance policies",
            "Strengthen oversight, accountability, and ethical leadership across all organs",
            "Lead a member-driven review and amendment of the IEK Constitution, building on the 2015 amendments and finalizing the 2026 draft through inclusive engagement",
        ],
        conclusion: "Good governance is non-negotiable if IEK is to command respect nationally and globally.",
        description:
            `Strong institutions are built on trust, transparency, and accountability. I will uphold strict adherence to the IEK Constitution and governance policies while strengthening oversight and ethical leadership across all organs. I will lead a member-driven review and amendment of the IEK Constitution to ensure it remains a robust framework for our institution's future.`,
    },
    {
        id: 3,
        title: "Partnerships and Collaboration",
        slug: "partnerships-and-collaboration",
        invocation: "No institution thrives in isolation. I will:",
        points: [
            "Strengthen partnerships with Industry, Academia, Government, and Development partners",
            "Deepen regional and global affiliations to align IEK with international best practice",
            "Promote exchange programs, knowledge transfer, and professional mobility for members",
            "Initiate partnership with State Department for Immigration to ease VISA renewal for engineers working abroad",
        ],
        conclusion: "Through collaboration, IEK will remain relevant, competitive, and future-ready.",
        description:
            `No institution thrives in isolation. I will strengthen partnerships with Industry, Academia, Government, and Development partners. By deepening regional and global affiliations, I will align IEK with international best practices and promote professional mobility for our members, including initiating partnerships to ease VISA renewals for engineers working abroad.`,
    },
    {
        id: 4,
        title: "Advocacy",
        slug: "advocacy",
        invocation: "IEK must be the strongest voice for engineers in Kenya. I will advocate for:",
        points: [
            "A harmonized Scheme of Service for engineers in the public sector",
            "Full implementation of the scale of fees",
            "Greater engagement of local engineers in infrastructure projects",
            "Engineers’ inclusion in boards and decision-making bodies",
            "Active participation in policy, regulatory, and legislative processes",
            "Effective engineering regulation and enforcement",
        ],
        conclusion: "The engineering voice must be heard, respected, and acted upon.",
        description:
            `IEK must be the strongest voice for engineers in Kenya. I will advocate for a harmonized Scheme of Service in the public sector, full implementation of the scale of fees, and greater engagement of local engineers in infrastructure projects. The engineering voice must be heard, respected, and acted upon in policy and legislative processes.`,
    },
    {
        id: 5,
        title: "Research and Development",
        slug: "research-and-development",
        invocation: "Innovation is the currency of progress. I will:",
        points: [
            "Promote research-driven policy engagement",
            "Encourage collaboration between academia, industry, and government",
            "Use evidence-based advocacy to shape national development discourse",
        ],
        conclusion: "Research will anchor IEK’s relevance in a rapidly evolving world.",
        description:
            `Innovation is the currency of progress. I will promote research-driven policy engagement and encourage collaboration between academia, industry, and government. By using evidence-based advocacy, we will shape the national development discourse and anchor IEK’s relevance in a rapidly evolving world.`,
    },
    {
        id: 6,
        title: "Training, Mentorship, and CPD",
        slug: "training-mentorship-cpd",
        invocation: "Professional growth must be continuous and accessible. I will:",
        points: [
            "Strengthen structured training and mentorship across all membership classes",
            "Support smooth transition from student to graduate to professional engineer",
            "Strengthen collaboration between IEK and Engineering Deans and Principals",
            "Make CPD programs affordable, accessible, and relevant to all engineers",
        ],
        conclusion: "An empowered engineer is an effective engineer.",
        description:
            `Professional growth must be continuous and accessible. I will strengthen structured training and mentorship across all membership classes and support the smooth transition from student to professional engineer. My goal is to make CPD programs affordable, accessible, and highly relevant to the needs of all engineers.`,
    },
    {
        id: 7,
        title: "Affordable Financing and Member Welfare",
        slug: "financing-and-welfare",
        invocation: "Engineers must be economically empowered. I will:",
        points: [
            "Negotiate affordable financing solutions for engineers and engineering firms",
            "Promote structured member welfare programs, including medical cover, last expense, SACCOs, professional indemnity, and asset financing",
        ],
        conclusion: "Member welfare is institutional sustainability.",
        description:
            `Engineers must be economically empowered. I will negotiate affordable financing solutions for engineers and firms while promoting structured welfare programs, including medical cover, SACCOs, and professional indemnity. Member welfare is essential for institutional sustainability.`,
    },
];