export const resetUrl = "https://passwordreset.microsoftonline.com/";

export const protectedServices = {
  "software-centre": {
    title: "Software Centre",
    url: "https://titchfieldrds.rtc.uk.net/RDWeb/Pages/en-US/login.aspx?ReturnUrl=/RDWeb/Pages/en-US/Default.aspx",
  },
  "contact-it": {
    title: "Contact IT",
    url: "https://regentgroup.freshservice.com/a/tickets/new",
  },
  "my-tickets": {
    title: "My Tickets",
    url: "https://regentgroup.freshservice.com/support/tickets",
  },
} as const;

export type Service = keyof typeof protectedServices;
export function isService(value: string | null | undefined): value is Service {
  return !!value && Object.hasOwn(protectedServices, value);
}

export const supportEmail = "itsupport@regentcollege.ac.uk";
export const supportPhone = "+44 20 7487 7200";
export const supportHours = "Monday–Friday, 08:00–18:00";

export const tiles = [
  { title: "Password Reset", icon: "key", tone: "pink", description: "Reset your Microsoft 365 password securely using Microsoft’s self-service portal.", action: "Reset Password", href: resetUrl, public: true },
  { title: "Software Centre", icon: "laptop", tone: "lilac", description: "Access approved college applications, software packages and licensed tools.", action: "Open Software Centre", href: "/software-centre", public: false },
  { title: "Contact IT", icon: "ticket", tone: "blue", description: "Submit a support request, report an issue, or request assistance from the IT Service Desk.", action: "Raise Ticket", href: "/contact-it", public: false },
] as const;

export const resources = [
  { title: "Account & Security", icon: "lock", items: [
    { title: "Microsoft 365", icon: "microsoft", description: "Outlook, Teams, OneDrive and Office online", href: "https://www.microsoft365.com/" },
    { title: "Set Up MFA", icon: "shield", description: "Register or manage your multi-factor authentication", href: "https://mysignins.microsoft.com/security-info" },
    { title: "Change Password", icon: "lock", description: "Update your college account password", href: "https://myaccount.microsoft.com/" },
  ]},
  { title: "Support Resources", icon: "book", items: [
    { title: "Knowledge Base", icon: "shield", description: "Step-by-step guides and troubleshooting", href: "https://regentgroup.freshservice.com/support/solutions" },
    { title: "FAQs", icon: "help", description: "Find answers to common questions", href: "/help#faqs" },
    { title: "IT Policies", icon: "file", description: "Request current IT policies from the Service Desk", href: "/help#policies" },
  ]},
  { title: "Requests & Access", icon: "users", items: [
    { title: "My Tickets", icon: "list", description: "Track requests you’ve already raised", href: "/my-tickets" },
    { title: "Wi-Fi Access", icon: "wifi", description: "Connect your devices on campus", href: "/help#wifi" },
    { title: "Printing Services", icon: "printer", description: "Get help with campus printing and print credit", href: "/help#printing" },
  ]},
] as const;
