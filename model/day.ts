
export type Day = 
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday' 
    | 'Thursday' 
    | 'Friday' 
    | 'Saturday' 
    | 'Sunday'  

export function localizeDay(day: Day): string {
    switch (day) {
        case 'Monday':
            return 'Lundi'
        case 'Tuesday':
            return 'Mardi'
        case 'Wednesday':
            return 'Mercredi'
        case 'Thursday':
            return 'Jeudi'
        case 'Friday':
            return 'Vendredi'
        case 'Saturday':
            return 'Samedi'
        case 'Sunday':
            return 'Dimanche'
    }
}