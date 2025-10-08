export async function createAdmin(mongodb) {
    const userModel = new(await
        import ("../models/User.js")).User(mongodb);
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existing = await userModel.findByEmail(adminEmail);
    if (!existing) {
        await userModel.create({ name: "Admin", email: adminEmail, password: adminPassword, role: "admin", isPaid: true });
        console.log("Admin created:", adminEmail);
    }
}