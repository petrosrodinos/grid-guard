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
    from: string,
    to: string,
    area: string,
    reason: string
}