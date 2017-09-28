export const types = [
  'Advice & Support',
  'Advocacy',
  'Befriending',
  'Children & Young People',
  'Destitution & Debt',
  'Education',
  'Employment / Training / Volunteering',
  'Faith',
  'Family',
  'Food',
  'Healthcare / Mental Health / Disability',
  'Housing',
  'LGBTQI',
  'Legal',
  'Non-food items',
  'Social (clubs, groups)',
  'Support',
  'Trafficking & Gender Based Violence',
  'Translation',
  'Women'
]

export const organisationTypes = [
  'NGO / Charity',
  'State',
  'Local government',
  'Grassroots org/ Community',
  'Religious',
  'Other',
  'Website',
  'Business',
  'Legal firm'
]

export const formHelpers = {
  name: 'Give the official name of the organisation, e.g. Help Refugees.',

  headline: "Give a brief headline explaining what the service provides, e.g.: 'Free food every Saturday'; 'Employment advice'; 'Drop-in health service'. Be as concise as possible.",

  type: 'Select the type of service that the organisation offers.  Bear in mind that sometimes you will have to choose an option that only fits loosely/broadly. Some services may fall under multiple categories, e.g. an ESOL class for teens would come under ‘Education’ and ‘Children & Young People’.',

  details: `
  Write a few sentences in plain English to explain what the service provides. You may adapt a paragraph from the service/org's website - but do not simply copy and paste. Include details about:
  - The types of services they offer and who the services are for - e.g. "Doctors of the World UK offers primary health care and health & social advice for asylum seekers, undocumented migrants, homeless people and sex workers".
  - Concisely include any other services they offer: "They also signpost to other services, including housing advice, destitution support and specialist counselling."
  - Include any extra information about drop-off services or specialist support, e.g.:  "Drop-in health consultations for refugees and asylum seekers on Tuesdays from 8-11am."
  - Include the organisation's charity number, if they have one, e.g. "Charity no. 1067406."
  Charity
  DON'T use 'we' or general information about the charity itself or historial or socio-political content, e.g.: "Doctors of the World is an independent humanitarian movement working at home and abroad to empower excluded people to access healthcare."
  
  EXAMPLE ENTRY USING THE ABOVE: Doctors of the World UK offers primary health care and health and social advice for asylum seekers, undocumented migrants, homeless people and sex workers. They also signpost to other services, including housing advice, destitution support and specialist counselling. Drop-in health consultations for refugees and asylum seekers on Tuesdays from 8-11am. Charity no. 1067406."
  `,

  locations: "Enter the location of the service/organisation. If the organisation has multiple addresses, make a new entry for each address. If the organisation is online only, write 'Online'.",

  phone: 'Make sure that you write the phone number that the organisation is happy to be contacted by caseworkers, refugees and volunteers on. DO NOT include personal details without consent.',

  email: 'Make sure that you write the email address that the organisation is happy to be contacted by caseworkers, refugees and volunteers on. DO NOT include personal details without consent.',

  website: "Enter the service or organisation's website. If the organisation does not have a website, or if their website is extremely out of date, see if they are active on social media and, for example, use their Facebook page instead. If the organisation does not have an online presence, write 'n/a'.",

  openingHours: 'Check the boxes for the corresponding days on which the service or organisation is open.',

  volunteerNeed: 'Ask the organisation whether they have a need for volunteers, and check the box if they do.'

}
