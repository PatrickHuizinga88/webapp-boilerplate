export const capitalize = (s: string) => s.replace(/\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
)