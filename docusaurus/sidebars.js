const sidebars = {
    tutorialSidebar: [
        "intro",
        {
            type: "category",
            label: "Basic",
            items: ["basic/skills-configuration", "basic/commands-configuration"],
        },
        {
            type: "category",
            label: "Advanced",
            items: ["advanced/sandboxed-environment"],
        },
    ],
};

module.exports = sidebars;
