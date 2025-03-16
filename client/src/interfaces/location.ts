export interface Location {
    id: string,
    user_id: string,
    prefecture: string,
    municipality: string,
    address: string,
    name: string
    outages?: Outage[]
}

export interface Outage {
    from: OutageDate,
    to: OutageDate,
    area: string,
    reason: string,
    areaDescription: string
}

export interface OutageDate {
    date: string,
    time: string
}