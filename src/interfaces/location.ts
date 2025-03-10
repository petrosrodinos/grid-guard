export interface Location {
    prefecture: string,
    municipality: string,
    address: string,
    outage: Outage[]
}

export interface Outage {
    from: string,
    to: string,
    area: string,
    reason: string
}