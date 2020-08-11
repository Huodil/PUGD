const SidebarItems = {
  authorities: [
    "Authorities",
    {
      Label: "Search",
      Icon: "search",
      Children: [
        {
          Label: "All authorities",
          href: "/admin/authorities/allAuth",
        },
        {
          Label: "Predefined",
          href: "/admin/authorities/predefined",
        },
      ],
    },
    {
      Label: "Authorities",
      Icon: "settings_input_svideo",
      Children: [
        {
          Label: "Author",
          href: "/admin/authorities/author",
        },
        {
          Label: "headings",
          href: "/admin/authorities/headings",
        },
        {
          Label: "Publisher",
          href: "/admin/authorities/publisher",
        },
        {
          Label: "Series",
          href: "/admin/authorities/series",
        },
        {
          Label: "Sub-series",
          href: "/admin/authorities/sub_series",
        },
        {
          Label: "Collection Title",
          href: "/admin/authorities/collection_title",
        },
        {
          Label: "Uniform Titles",
          href: "/admin/authorities/uniform_title",
        },
        {
          Label: "Class number",
          href: "/admin/authorities/class_number",
        },
      ],
    },
    {
      Label: "Baskets",
      Icon: "shopping_basket",
      Children: [
        {
          Label: "Management",
          href: "/admin/authorities/basket/management",
        },
        {
          Label: "Collection",
          href: "/admin/authorities/basket/collection",
        },
        {
          Label: "Tag on/off",
          href: "/admin/authorities/basket/tags",
        },
        {
          Label: "Actions",
          href: "/admin/authorities/basket/actions",
        },
      ],
    },
    {
      Label: "Semantic",
      Icon: "spellcheck",
      Children: [
        {
          Label: "Synonyms",
          href: "/admin/authorities/synonyms",
        },
        {
          Label: "Stopwords",
          href: "/admin/authorities/stopwords",
        },
      ],
    },
    {
      Label: "Management",
      Icon: "settings_applications",
      Children: [
        {
          Label: "Import",
          href: "/admin/authorities/import",
        },
      ],
    },
  ],
  circulation: [
    "Circulation",
    {
      Label: "Circulation",
      Icon: "home",
      Children: [
        {
          Label: "Prêt de documents",
          href: "/admin/circulation/Circulations/pret_document",
        },
        {
          Label: "Retour de documents",
          href: "/admin/circulation/Circulations/retour_Document",
        },
        {
          Label: "Documents À traiter",
          href: "/admin/circulation/Circulations/taritDoc",
        },

        {
          Label: "Groupes de lecteurs",
          href: "/admin/circulation/Circulations/groups",
        },
        {
          Label: "Nouveau lecteur",
          href: "/admin/circulation/Circulations/BorrowersList",
        },
        {
          Label: "Périodiques",
          href: "/admin/circulation/Circulations/periodique",
        },
        {
          Label: "Recharch Personalisé",
          href: "/admin/circulation/Circulations/recharch",
        },
        {
          Label: "List lecteur (Borrows)",
          href: "/admin/circulation/Circulations/BorrowersList",
        },
      ],
    },
    {
      Label: "Paniers",
      Icon: "shopping_basket",
      Children: [
        {
          Label: "Author",
          href: "/admin/Circulation/author",
        },
        {
          Label: "headings",
          href: "/admin/Circulation/headings",
        },
        {
          Label: "Publisher",
          href: "/admin/Circulation/publisher",
        },
        {
          Label: "Series",
          href: "/admin/Circulation/series",
        },
        {
          Label: "Sub-series",
          href: "/admin/Circulation/sub_series",
        },
        {
          Label: "Collection Title",
          href: "/admin/Circulation/collection_title",
        },
        {
          Label: "Uniform Titles",
          href: "/admin/Circulation/uniform-titles",
        },
        {
          Label: "Class number",
          href: "/admin/Circulation/class_number",
        },
      ],
    },
    {
      Label: "Visualiser",
      Icon: "settings_input_svideo",
      Children: [
        {
          Label: "Management",
          href: "/admin/Circulation/basket/management",
        },
        {
          Label: "Collection",
          href: "/admin/Circulation/basket/collection",
        },
        {
          Label: "Tag on/off",
          href: "/admin/Circulation/basket/tags",
        },
        {
          Label: "Actions",
          href: "/admin/Circulation/basket/actions",
        },
      ],
    },
    {
      Label: "Réservations",
      Icon: "spellcheck",
      Children: [
        {
          Label: "Synonyms",
          href: "/admin/Circulation/synonyms",
        },
        {
          Label: "Stopwords",
          href: "/admin/Circulation/stopwords",
        },
      ],
    },
  ],
  
   Cataloguing: [
    "Cataloguing",
    {
      Label: "Search",
      Icon: "home",
      Children: [
        {
          Label: "All Libraries",
          href: "/admin/cataloguing/Library/libraries"
      },
      {
          Label: "All Branches",
          href: "/admin/cataloguing/Branch/branches"
      },
      {
          Label: "All Records",
          href: "/admin/cataloguing/Record/Records"
      },
      {
          Label: "All Copies",
          href: "/admin/cataloguing/Copy/copies"
      },

      {
          Label: "All Serials",
          href: "/admin/cataloguing/Serial/Serials"
      },
      {
          Label: "All KeyWords",
          href: "/admin/cataloguing/KeyWord/KeyWords"
      },
      {
          Label: "All Languages",
          href: "/admin/cataloguing/Language/Languages"
      },

      ],
    },
    {
      Label: "Search2",
      Icon: "home",
      Children: [
        {
          Label: "All Libraries",
          href: "/admin/cataloguing/Library/libraries"
      },
      {
          Label: "All Branches",
          href: "/admin/cataloguing/Branch/branches"
      },
      {
          Label: "All Records",
          href: "/admin/cataloguing/Record/Records"
      },
      {
          Label: "All Copies",
          href: "/admin/cataloguing/Copy/copies"
      },

      {
          Label: "All Serials",
          href: "/admin/cataloguing/Serial/Serials"
      },
      {
          Label: "All KeyWords",
          href: "/admin/cataloguing/KeyWord/KeyWords"
      },
      {
          Label: "All Languages",
          href: "/admin/cataloguing/Language/Languages"
      },

      ],
    },
  ],
  
  reporting: [
    "reporting",
    {
      Label: "Stats",
      Icon: "search",
      Children: [
        {
          Label: "Customizable",
          href: "/admin/reporting/customizablz",
        },
        {
          Label: "Configurable",
          href: "/admin/reporting/configurable",
        },
      ],
    },
    {
      Label: "Loans",
      Icon: "settings_input_svideo",
      Children: [
        {
          Label: "Current Loans",
          href: "/admin/reporting/currentloans",
        },
        {
          Label: "Delay by Reader",
          href: "/admin/reporting/delaybyreader",
        },
        {
          Label: "Delay by Date",
          href: "/admin/reporting/delaybydate",
        },
        {
          Label: "Loan Group",
          href: "/admin/reporting/loangroup",
        },
        {
          Label: "Delay by Group",
          href: "/admin/reporting/delaybygroup",
        },
      ],
    },
    {
      Label: "Reservations",
      Icon: "spellcheck",
      Children: [
        {
          Label: "In Progress",
          href: "/admin/reporting/inprogress",
        },
        {
          Label: "Treat",
          href: "/admin/reporting/totreat",
        },
      ],
    },
    {
      Label: "Readers",
      Icon: "spellcheck",
      Children: [
        {
          Label: "Current Readers",
          href: "/admin/reporting/currentreaders",
        },
        {
          Label: "End of Subscription",
          href: "/admin/reporting/endofsubscription",
        },
        {
          Label: "Subscription Exceeded",
          href: "/admin/reporting/subscriptionexceed",
        },
        {
          Label: "Category to Change",
          href: "/admin/reporting/categorytochange",
        },
      ],
    },
    {
      Label: "Periodic",
      Icon: "settings_applications",
      Children: [
        {
          Label: "Collection Stat",
          href: "/admin/reporting/collectionstat",
        },
        {
          Label: "Circulation Stat",
          href: "/admin/reporting/circulationstat",
        },
        {
          Label: "Simplified Circulation",
          href: "/admin/reporting/simplifiedcirculation",
        },
      ],
    },
    {
      Label: "BarCode",
      Icon: "settings_applications",
      Children: [
        {
          Label: "Free Generated",
          href: "/admin/reporting/freegenerated",
        },
      ],
    },
    {
      Label: "Labels",
      Icon: "settings_applications",
      Children: [
        {
          Label: "Plank Models",
          href: "/admin/reporting/plankmodels",
        },
      ],
    },
    {
      Label: "Templates",
      Icon: "settings_applications",
      Children: [
        {
          Label: "Notices",
          href: "/admin/reporting/notices",
        },
        {
          Label: "Circulation List",
          href: "/admin/reporting/circulationlist",
        },
        {
          Label: "Bannettes",
          href: "/admin/reporting/bannettes",
        },
      ],
    },
    {
      Label: "OPAC",
      Icon: "settings_applications",
      Children: [
        {
          Label: "Mail Compaign",
          href: "/admin/reporting/mailcompaign",
        },
      ],
    },
  ],
  acquisition: [
    "Acquisition",
    {
      Label: "Purchases",
      Icon: "home",
      Children: [
        {
          Label: "Providers",
          href: "/admin/acquisition/AllProviders",
        },
        {
          Label: "Quotations",
          href: "/admin/acquisition/AllQuotations",
        },
        {
          Label: "Orders",
          href: "/admin/acquisition/AllOrders",
        },
        {
          Label: "Receivings",
          href: "/admin/acquisition/Receivings",
        },
        {
          Label: "Deliveries",
          href: "/admin/acquisition/Deliveries",
        },
      ],
    },
    {
      Label: "Suggestions",
      Icon: "spellcheck",
      Children: [
        {
          Label: "Import Suggestion",
          href: "/admin/acquisition/ImportSugg",
        },
        {
          Label: "Suggestion by reader",
          href: "/admin/acquisition/SuggByReader",
        },
      ],
    },
  ],
};

export default SidebarItems;
