# FOBOH Engineering Challenge

# Precedence Rule
As a supplier, I will be able to adjust the priority level of my price profiles (with an additional UI for priority selection). When a customer is connected to multiple price profiles, the system will first rank them by priority from high to low. If multiple price profiles share the same priority level, the lowest price among them will be selected.

## Setup-frontend
```
git clone https://github.com/linklin830912/FOBOH_Engineering_Challenge.git
cd FOBOH_Engineering_Challenge/frontend
npm install
npm run dev
```
## Run on
http://localhost:5173


## Setup-backend
```
cd FOBOH_Engineering_Challenge/backend
npm install
npm run dev
```
## Run on
http://localhost:3001

## Swagger on
http://localhost:3001/api-docs/#/

# Trade-Offs

**Mock Relational Fields in an In-Memory Database**

1. **Context:**
   - The project currently uses an in-memory mock database for simplicity and rapid prototyping instead of a relational database such as PostgreSQL

2. **Solution:** 
   - Temporary mock relational fields are introduced to emulate bidirectional relationships. These fields act as a lightweight in-memory solution that mimics foreign key relationships, allowing queries to traverse associations in both directions without a real ORM or relational database engine. They are intended to be removed once a proper relational database and ORM layer are implemented:
     - Customer.groupIds
     - CustomerGroup.priceProfileIds

3. **Benefits:**
   - Faster implementation without requiring a real database or ORM setup.
   - Easier bidirectional querying in the mock environment.

4. **Costs:**
   - Relationship consistency must be synchronized manually.
   - Complex cascading logic is required when updating or deleting PricingProfile, since related CustomerGroup and Customer references must also be updated manually.
   - Query performance temporarily relies on array traversal rather than indexed relational joins, making the current approach less efficient.

**Decoupling the PricingProfile-Customer relationship via CustomerGroup**

1. **Context:**
   - Maintaining both a direct `PricingProfile-Customer` relation and a `PricingProfile-CustomerGroup` relation simultaneously introduces multiple relationship paths and creates two sources of truth.
   - A direct `PricingProfile-Customer` relation also reduces flexibility for future operations such as group-level precedence, bulk assignment/removal, and reusable customer segmentation.

2. **Solution:**
   - `CustomerGroup` acts as the single association layer between `Customer` and `PricingProfile`.
   - Individually added customers are automatically placed into a CustomerGroup with `type="auto"`, distinct from manually managed groups with `type="custom"`.

3. **Benefits:**
   - Relationship traversal becomes normalized and predictable:
   `PricingProfile` → `CustomerGroup` → `Customer`
   - PricingProfile remains the single source of truth for pricing intent, including:
      - priority
      - adjustment mode and adjustment increment mode
      - product scope (All Product)
   - Customer segmentation logic becomes reusable and extensible.

4. **Costs:**
   - Additional logic is required to create and maintain `CustomerGroup` with `type="auto"`
   - CRUD operations become more complex due to cascading relationship synchronization between:
      `PricingProfile`
      `CustomerGroup`
      `Customer`

# What's Next

Connecting to a real relational database to replace the in-memory store is the essential next step. The schema relationships between Product, PricingProfile, CustomerGroup, and Customer map naturally to foreign keys and inner joins, so the migration path is straightforward.

The current design handles a few non-obvious scenarios cleanly, and opens the door to some interesting extensions:

1. A supplier adds multiple customer groups to a pricing profile. If a group grows later, no changes are needed to the profile — it is linked to the group, not to individual customers.
2. A supplier wants to remove all individually-added customers from a profile without affecting customers who belong via a group. Deleting the auto-generated group is sufficient — group members are untouched.
3. The `type` field on CustomerGroup distinguishes auto-generated groups (individually added customers) from manually created ones. If the precedence rule ever needs to evolve — for example, giving individually added customers automatic top priority over group matches — the data to support that decision is already there without a schema change.
4. To remove a customer from all pricing profiles, you only need to remove them from their customer groups — no changes to the profiles themselves.
5. The CustomerGroup concept could extend to products — a ProductGroup (by category, brand, or expiry date) linked to a pricing profile rather than individual products. This would decouple product selection from the profile the same way CustomerGroup decouples customer selection, making bulk pricing rules more flexible and easier to maintain over time.