export class Company {
    id: number;
    name: string;
    type: number;
    revenuePerWeek: [{
        monday: number,
        tuesday: number,
        wednesday: number,
        thursday: number,
        friday: number,
        saturday: number,
        sunday: number
    }];
    revenue: number;
    monthRevenue: number;
}
