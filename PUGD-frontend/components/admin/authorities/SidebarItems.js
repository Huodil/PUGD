const SidebarItems = [
    "Authorities",
    {
        Label: "Search",
        Children: [
            {
                Label: "All authorities",
                href: "/admin/authorities/allAuth"
            },
            {
                Label: "Predefined",
                href: "/admin/authorities/predefined"
            },

        ]
    },
    {
        Label: "Authorities",
        Children: [
            {
                Label: "Author",
                href: "/admin/authorities/author"
            },
            {
                Label: "headings",
                href: "/admin/authorities/headings"
            },
            {
                Label: "Publisher",
                href: "/admin/authorities/publisher"
            },
            {
                Label: "Series",
                href: "/admin/authorities/series"
            },
            {
                Label: "Sub-series",
                href: "/admin/authorities/sub_series"
            },
            {
                Label: "Collection Title",
                href: "/admin/authorities/collection_title"
            },
            {
                Label: "Uniform Titles",
                href: "/admin/authorities/uniform-titles"
            },
            {
                Label: "Class number",
                href: "/admin/authorities/class_number"
            },


        ]
    },
    {
        Label: "Baskets",
        Children: [
            {
                Label: "Management",
                href: "/admin/authorities/management"
            },
             {
                Label: "Collection",
                href: "/admin/authorities/collection"
            },
             {
                Label: "Tag on/off",
                href: "/admin/authorities/tags"
            },
             {
                Label: "Actions",
                href: "/admin/authorities/actions"
            }, 
        ]
    },
    {
        Label: "Semantic",
        Children: [
            {
                Label: "Synonyms",
                href: "/admin/authorities/synonyms"
            }, 
            {
                Label: "Stopwords",
                href: "/admin/authorities/stopwords"
            },  
        ]
    },
    {
        Label: "Management",
        Children: [
            {
                Label: "Import",
                href: "/admin/authorities/import"
            },  
        ]
    },

]
export default SidebarItems