const SideBarData = [
    {
        id: "bar1",
        en: "Main",
        lt: "Pagrindinis",
        submenu : [
            {
                id:"button_livemap",
                en: "Live Map",
                lt:"Žemėlapis"
            },
            {
                id:"sub12",
                en: "Button2",
                lt: "Knopkė"
            },

        ]
    },
    {
        id: "bar_vehicles",
        en: "Vehicles",
        lt: "Automobiliai",
        submenu : [
            {
                id:"button_add_car",
                en: "CarList",
                lt: "Mašinų sąrašas"
            },
            {
                id:"ordercar",
                en: "OrderCar",
                lt: "Užsakyti mašiną"
            },
            {
                id: "addcar",
                en: "AddCar",
                lt: "Pridėti mašiną"
            },
            {
                id: "simspeed",
                en: "Vehicles speed",
                lt: "Mašinų greitis"
            }
        ]
    },
    {
        id: "bar_debug",
        lt: "Debugingas",
        en: "Debug",
        submenu : [
            {
                id: "button_learning",
                en: "Learning",
                lt: "Mokomes"
            },
            {
                id: "sub33",
                en: "Button3",
                lt: "Knopkė3"
            }
        ]
    }
]
export default SideBarData;