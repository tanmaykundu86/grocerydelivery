import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose)


export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"],
            },
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"],
            },
        },
        {
            resource: Models.Admin,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"],
            },
        },
        { resource: Models.Branch },
        { resource: Models.Product },
        { resource: Models.Category },
        { resource: Models.SubCategory },
        { resource: Models.StoreDiscount },
        { resource: Models.Order },
        { resource: Models.Counter },
    ],
    branding: {
        companyName: "Fresh Cart",
        withMadeWithLove: false,
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: '/admin'
});

const cookieSecret = 'sieL67H7GbkzJ4XCoH0IHcmO1hGBSiG5';
export const buildAdminRouter = async (app) => {
    await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: cookieSecret, 
            cookieName: 'adminjs',
        },
        app,
        {
            store: sessionStore,
            saveUnintialized: true,
            secret: cookieSecret,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            },
        },
    );
};