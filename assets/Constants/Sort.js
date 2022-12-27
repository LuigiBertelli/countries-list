export const options =  [
    {
        value: 1, 
        title: "Alphabetical Order (a-z)",
        sortFunc: function (a, b) {
            return a.name.common > b.name.common ? 1 : (
                a.name.common < b.name.common ? -1 : 0);
        },
    },
    {
        value: 2, 
        title: "Alphabetical Order (z-a)",
        sortFunc: function(a, b) {
            return a.name.common > b.name.common ? -1 : (
                a.name.common < b.name.common ? 1 : 0);
        },
    },
    { 
        value: 3,
        title: "Populational Order (Higher - Lower)",
        sortFunc: function(a, b) {
                return b.population - a.population;
            },
    },
    { 
        value: 4,
        title: "Populational Order (Lower - Higher)",
        sortFunc: function(a, b) {
                return a.population - b.population;
            },
    }
];