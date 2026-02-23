export type Issue = {
    id: number;
    title: string;
    slug: string;
    description: string;
};

export const issues: Issue[] = [
    {
        id: 1,
        title: "Inclusivity",
        slug: "inclusivity",
        description:
            `Inclusivity is the foundation of a strong and progressive Institution. As President, I will champion gender equity, youth participation, and the inclusion of persons living with disabilities. I will also strengthen programs for graduate engineers, technologists, technicians, and students, while expanding women-focused initiatives such as the She-Program. An inclusive IEK is a stronger, more relevant IEK.`,
    },
    {
        id: 2,
        title: "Good Governance",
        slug: "good-governance",
        description:
            `Strong institutions are built on trust, transparency, and accountability. I will uphold strict adherence to the IEK Constitution and governance policies while strengthening oversight and ethical leadership across all organs. I will lead a member-driven review and amendment of the IEK Constitution to ensure it remains a robust framework for our institution's future.`,
    },
    {
        id: 3,
        title: "Partnerships and Collaboration",
        slug: "partnerships-and-collaboration",
        description:
            `No institution thrives in isolation. I will strengthen partnerships with Industry, Academia, Government, and Development partners. By deepening regional and global affiliations, I will align IEK with international best practices and promote professional mobility for our members, including initiating partnerships to ease VISA renewals for engineers working abroad.`,
    },
    {
        id: 4,
        title: "Advocacy",
        slug: "advocacy",
        description:
            `IEK must be the strongest voice for engineers in Kenya. I will advocate for a harmonized Scheme of Service in the public sector, full implementation of the scale of fees, and greater engagement of local engineers in infrastructure projects. The engineering voice must be heard, respected, and acted upon in policy and legislative processes.`,
    },
    {
        id: 5,
        title: "Research and Development",
        slug: "research-and-development",
        description:
            `Innovation is the currency of progress. I will promote research-driven policy engagement and encourage collaboration between academia, industry, and government. By using evidence-based advocacy, we will shape the national development discourse and anchor IEK’s relevance in a rapidly evolving world.`,
    },
    {
        id: 6,
        title: "Training, Mentorship, and CPD",
        slug: "training-mentorship-cpd",
        description:
            `Professional growth must be continuous and accessible. I will strengthen structured training and mentorship across all membership classes and support the smooth transition from student to professional engineer. My goal is to make CPD programs affordable, accessible, and highly relevant to the needs of all engineers.`,
    },
    {
        id: 7,
        title: "Affordable Financing and Member Welfare",
        slug: "financing-and-welfare",
        description:
            `Engineers must be economically empowered. I will negotiate affordable financing solutions for engineers and firms while promoting structured welfare programs, including medical cover, SACCOs, and professional indemnity. Member welfare is essential for institutional sustainability.`,
    },
];