import type {
  BulkContactManagement,
  Contact,
  LibraryResponse,
} from 'node-mailjet';
import { Client } from 'node-mailjet';

const mailjet = new Client({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});

const CONTACT_LIST_IDS_DEV = [
  { id: 149851, name: 'Deals and promotions' },
  { id: 149852, name: 'Feedback and survey' },
  { id: 149853, name: 'Newsletter' },
  { id: 149454, name: 'Marketing' },
  { id: 149453, name: 'Product Announcement' },
];
const CONTACT_LIST_IDS_PROD = [
  { id: 150409, name: 'Deals and promotions' },
  { id: 150410, name: 'Feedback and survey' },
  { id: 149867, name: 'Internal testing' },
  { id: 150411, name: 'Marketing' },
  { id: 150412, name: 'Newsletter' },
  { id: 150413, name: 'Product Announcement' },
];

const CONTACT_LIST_IDS =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? CONTACT_LIST_IDS_PROD
    : CONTACT_LIST_IDS_DEV;

const CONTACTS_LISTS: Array<BulkContactManagement.ContactList> =
  CONTACT_LIST_IDS.map((contact) => ({
    Action:
      'addnoforce' as BulkContactManagement.ManageContactsAction.AddNoForce,
    ListID: contact.id,
  }));

export async function createMailjetContact(email: string) {
  try {
    const requestBody: Contact.PostContactBody = { Email: email };
    const response: LibraryResponse<Contact.PostContactResponse> = await mailjet
      .post('contact', { version: 'v3' })
      .request(requestBody);

    return {
      data: {
        contactId: response.body.Data[0].ID,
      },
      error: null,
    };
  } catch (e) {
    console.error(e);

    return {
      data: null,
      error: e,
    };
  }
}

export async function updateMailjetContactsLists(email: string) {
  try {
    const requestBody: BulkContactManagement.PostContactManageManyContactsBody =
      {
        Contacts: [
          {
            Email: email,
          },
        ],
        ContactsLists: CONTACTS_LISTS,
      };
    const response: LibraryResponse<BulkContactManagement.PostContactManageManyContactsResponse> =
      await mailjet
        .post('contact', { version: 'v3' })
        .action('managemanycontacts')
        .request(requestBody);

    return {
      data: {
        jobId: response.body.Data[0].JobID,
      },
      error: null,
    };
  } catch (e) {
    console.error(e);

    return {
      data: {
        jobId: null,
      },
      error: e,
    };
  }
}
