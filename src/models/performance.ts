import * as db from '../db/config';

export class Performance {
    private _id             : number;
    private performanceName : string;
    private count           : number;
    private imageName       : string;
    private newEntry        : boolean; // used to determine whether new or fetched from DB

    // Create a new performance object
    constructor(name: string) {
        this.performanceName = name;
        this.count           = 0;
        this.imageName       = this.performanceName.toLowerCase().replace(/ /, '_');
        this.newEntry        = true;
    }

    // Return all performances given in the database
    public static async returnAllPerformances(): Promise<Performance[]> {
        const performances: Performance[] = [];
        try {
            const results = await db.pool.query('SELECT * FROM performances LIMIT 10', []);
            results.rows.forEach((res: DBPerformance) => {
                const single    = new Performance(res.name);
                single._id      = res.id;
                single.count    = res.votes;
                single.newEntry = false;
                performances.push(single);
            });
            return Promise.resolve(performances);
        } catch (err) {
            throw err;
        }
    }

    // This should only be used when building out from DB.
    set votes(numberVotes: number) {
        this.count = numberVotes;
    }

    get votes() {
        return this.count;
    }

    // Add a single vote & returns total number of votes
    public addVote(): number {
        this.count += 1;
        return this.count;
    }

    public subtractVote(): number {
        this.count -= 1;
        return this.count;
    }

    public clearVotes(): void {
        this.count = 0;
    }

    public static async getTop(places: number): Promise<Performance[]> {
        try {
            const performances: Performance[] = [];
            const results = await db.pool.query('SELECT * FROM performances ORDER BY votes DESC LIMIT $1', [places]);

             results.rows.forEach((res: DBPerformance) => {
                const single    = new Performance(res.name);
                single._id      = res.id;
                single.count    = res.votes;
                single.newEntry = false;
                performances.push(single);
            });
            return Promise.resolve(performances);
        } catch (err) {
            throw err;
        }
    }
    // set and change name(?) - guess we can use the ID to index
    set name(name: string) {
        this.performanceName = name;
    }

    get name() {
        return this.performanceName;
    }

    get fileName() {
        return this.imageName;
    }

    set fileName(name: string) {
        this.imageName = name;
    }

    get id() {
        return this._id;
    }

    // Search for performance by name
    public static async findByName(name: string): Promise<Performance> {
        try {
            const results = await db.pool.query('SELECT * FROM performances WHERE name = $1', [name]);
            const dbPerf: DBPerformance = results.rows[0];
            if (!dbPerf) { // doesn't exist, so just return null
                return Promise.resolve(null);
            }

            const perf    = new Performance(dbPerf.name);
            perf._id      = dbPerf.id;
            perf.votes    = dbPerf.votes;
            perf.newEntry = false;
            return Promise.resolve(perf);
        } catch (err) {
            throw err;
        }
    }

    // Search for performance by ID
    public static async findById(id: number): Promise<Performance> {
        try {
            const results = await db.pool.query('SELECT * FROM performances WHERE id = $1', [id]);
            const dbPerf: DBPerformance = results.rows[0];
            if (!dbPerf) { // doesn't exist, so just return null
                return Promise.resolve(null);
            }

            const perf    = new Performance(dbPerf.name);
            perf._id      = dbPerf.id;
            perf.votes    = dbPerf.votes;
            perf.newEntry = false;
            return Promise.resolve(perf);
        } catch (err) {
            throw err;
        }
    }

    // Save a new performance or update an existing performance
    public async save(): Promise<boolean> {
        if (this.newEntry) {
            try {
                const results = await db.pool.query('INSERT INTO performances(name, votes, image_file) VALUES($1, $2, $3)', [this.performanceName, this.count, this.imageName]);
                return Promise.resolve(true);
            } catch (err) {
                throw err;
            }
        } else {
            try {
                await db.pool.query('UPDATE performances SET name = $1, votes = $2, image_file = $3 WHERE id = $4', [this.name, this.count, this.imageName, this._id]);
                return Promise.resolve(true);
            } catch (err) {
                throw err;
            }
        }
    }

    // Delete a single performance from the table
    public async delete(): Promise<boolean> {
        try {
            await db.pool.query('DELETE FROM performances WHERE id = $1', [this._id]);
            return true;
        } catch (err) {
            throw err;
        }
    }

    // Clear entire performance table
    public static async clearTable(): Promise<boolean> {
        try {
            await db.pool.query('DELETE FROM performances', []);
            return Promise.resolve(true);
        } catch (err) {
            throw err;
        }
    }
}
