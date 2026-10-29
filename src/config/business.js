// Business configuration — update before deployment
export const BUSINESS = {
  name: 'KGF Bakehouse',
  fullName: "Kaur's Gluten Free Bakehouse",
  phone: '+918073879160',
  phoneDisplay: '+91 80738 79160',
  whatsapp: '918073879160',
  instagram: 'https://www.instagram.com/kgfbakehouse',
  website: 'https://www.kgfbakehouse.in',
  tagline: 'Thoughtfully baked. Beautifully gluten-free.',
};

export function getWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encoded}`;
}

export function getProductWhatsAppUrl(productName, quantity = 1) {
  const message = `Hello KGF Bakehouse,\n\nI would like to enquire about the following product:\n\nProduct: ${productName}\nQuantity: ${quantity}\n\nPlease confirm the current price and availability.\n\nThank you.`;
  return getWhatsAppUrl(message);
}

export function getGeneralWhatsAppUrl() {
  const message = `Hello KGF Bakehouse,\n\nI'd like to learn more about your gluten-free products and place a pre-order.\n\nThank you.`;
  return getWhatsAppUrl(message);
}

export function getCakeEnquiryWhatsAppUrl(details) {
  const message = `Hello KGF Bakehouse,\n\nI'd like to enquire about a custom celebration cake:\n\nName: ${details.name}\nWhatsApp: ${details.phone}\nEvent Type: ${details.eventType}\nPreferred Date: ${details.date}\nServings/Size: ${details.servings}\nFlavour: ${details.flavour}\nDesign Description: ${details.design}\nAdditional Requirements: ${details.notes || 'None'}\n\nPlease contact me with pricing and availability.\n\nThank you.`;
  return getWhatsAppUrl(message);
}
