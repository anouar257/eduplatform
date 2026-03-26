import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent {
  lastUpdated = '23 Mars 2025';

  legalInfo = {
    companyName: 'EduPlatform SAS',
    legalForm: 'Société par Actions Simplifiée (SAS)',
    capital: '100 000 €',
    headquarters: '123 Rue de l\'Éducation, 75001 Paris, France',
    rcsNumber: 'RCS Paris B 123 456 789',
    vatNumber: 'FR 12 345 678 901',
    phone: '+33 1 23 45 67 89',
    email: 'contact@eduplatform.com',
    director: 'Jean Dupont',
    hosting: {
      name: 'Amazon Web Services EMEA SARL',
      address: '38 avenue John F. Kennedy, L-1855 Luxembourg'
    }
  };

  sections: any[] = [];

  constructor() {
    this.sections = [
      {
        title: 'Éditeur du site',
        content: `Le site EduPlatform est édité par :

${this.legalInfo.companyName}
Forme juridique : ${this.legalInfo.legalForm}
Capital social : ${this.legalInfo.capital}
Siège social : ${this.legalInfo.headquarters}
RCS : ${this.legalInfo.rcsNumber}
N° TVA : ${this.legalInfo.vatNumber}
Téléphone : ${this.legalInfo.phone}
Email : ${this.legalInfo.email}
Directeur de la publication : ${this.legalInfo.director}`
      },
      {
        title: 'Hébergeur du site',
        content: `Ce site est hébergé par :

${this.legalInfo.hosting.name}
Adresse : ${this.legalInfo.hosting.address}

L'hébergeur assure la disponibilité et la sécurité technique du site. Pour toute réclamation concernant l'hébergement, contactez-nous à l'adresse indiquée ci-dessus.`
      },
      {
        title: 'Propriété intellectuelle',
        content: `L'ensemble du contenu de ce site (textes, images, vidéos, logos, sons, logiciels, etc.) est protégé par le droit d'auteur et le droit des marques.

EduPlatform et son logo sont des marques déposées. Toute reproduction, même partielle, est interdite sans autorisation préalable.

Les cours, exercices et autres contenus pédagogiques sont soit la propriété exclusive d'EduPlatform, soit licenciés par nos partenaires éducatifs.`
      },
      {
        title: 'Responsabilité',
        content: `EduPlatform s'efforce de fournir des informations exactes et à jour. Cependant, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur le site.

EduPlatform ne saurait être tenue responsable :
• Des dommages directs ou indirects résultant de l'utilisation du site
• Des erreurs ou omissions dans le contenu publié
• Des interruptions ou bugs techniques
• Des contenus publiés par les utilisateurs

Les liens vers des sites tiers sont fournis à titre informatif et ne constituent pas une recommandation.`
      },
      {
        title: 'Données personnelles',
        content: `Le traitement des données personnelles est décrit dans notre Politique de Confidentialité.

Le responsable du traitement est EduPlatform SAS, représentée par son directeur.

Les données collectées sont destinées à :
• La gestion des comptes utilisateurs
• La fourniture des services éducatifs
• L'amélioration de l'expérience utilisateur
• La communication commerciale (avec consentement)

Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données.`
      },
      {
        title: 'Cookies',
        content: `Ce site utilise des cookies pour :
• Assurer le bon fonctionnement de la plateforme
• Mémoriser vos préférences
• Analyser l'utilisation du site (mesure d'audience)

Vous pouvez configurer vos préférences de cookies dans les paramètres de votre navigateur.

Durée de conservation des cookies :
• Cookies de session : supprimés à la fermeture du navigateur
• Cookies persistants : 13 mois maximum`
      },
      {
        title: 'Droit applicable',
        content: `Le présent site et les présentes mentions légales sont régis par le droit français.

En cas de litige, et après tentative de résolution amiable, les tribunaux de Paris seront seuls compétents.

Vous pouvez également recourir à la médiation conformément aux conditions de notre médiateur agréé :
Médiateur de la consommation : MédiateurNet
Site : www.mediateurnet.fr`
      },
      {
        title: 'Crédits',
        content: `Conception et développement : Équipe technique EduPlatform
Design UI/UX : Équipe design EduPlatform
Contenu pédagogique : Équipe pédagogique EduPlatform
Images : Unsplash, Pexels (licences libres)
Icônes : Heroicons, Font Awesome

Nous remercions tous nos contributeurs et partenaires pour leur confiance.`
      }
    ];
  }
}