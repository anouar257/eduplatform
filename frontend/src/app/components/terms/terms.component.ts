import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  lastUpdated = '23 Mars 2025';

  sections = [
    {
      title: '1. Acceptation des conditions',
      content: `En utilisant la plateforme EduPlatform, vous acceptez sans réserve les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser notre plateforme.

L'utilisation de la plateforme implique l'acceptation pleine et entière des conditions générales ci-après décrites. Ces conditions s'appliquent à tous les utilisateurs, qu'ils soient élèves, parents, professeurs ou administrateurs.`
    },
    {
      title: '2. Description du service',
      content: `EduPlatform est une plateforme d'apprentissage en ligne qui propose :

• Des cours vidéo et des ressources pédagogiques
• Des examens et des tests d'évaluation
• Des sessions de cours en direct
• Une bibliothèque de documents téléchargeables
• Des outils de suivi de progression
• Un système de messagerie entre utilisateurs

Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment, avec ou sans préavis.`
    },
    {
      title: '3. Inscription et compte utilisateur',
      content: `Pour créer un compte, vous devez :

• Fournir des informations exactes et complètes
• Avoir au moins 13 ans, ou obtenir l'accord parental
• Choisir un mot de passe sécurisé
• Garifier la confidentialité de vos identifiants

Vous êtes responsable de toutes les activités effectuées sous votre compte. En cas de suspicion d'utilisation non autorisée, vous devez nous en informer immédiatement.

Les comptes sont personnels et non transférables. Un utilisateur ne peut créer qu'un seul compte par type (élève, parent, professeur).`
    },
    {
      title: '4. Abonnements et paiements',
      content: `Certains services nécessitent un abonnement payant :

• Les tarifs sont affichés clairement avant tout paiement
• Les paiements sont sécurisés et cryptés
• L'abonnement se renouvelle automatiquement sauf annulation
• Vous pouvez annuler à tout moment depuis votre compte
• Les remboursements sont possibles dans les 14 jours suivant l'achat

En cas de litige, nos CGV détaillées prévalent. Les prix peuvent être modifiés avec un préavis de 30 jours.`
    },
    {
      title: '5. Propriété intellectuelle',
      content: `Tout le contenu de la plateforme est protégé par le droit d'auteur :

• Les cours, vidéos et documents sont la propriété d'EduPlatform ou de ses partenaires
• Vous ne pouvez pas copier, reproduire ou redistribuer le contenu
• L'utilisation est strictement personnelle et non commerciale
• Toute violation peut entraîner des poursuites judiciaires

Vous conservez la propriété du contenu que vous créez (commentaires, travaux). En le publiant, vous accordez à EduPlatform une licence non exclusive d'utilisation.`
    },
    {
      title: '6. Règles de conduite',
      content: `Vous vous engagez à respecter les règles suivantes :

✓ Utiliser la plateforme uniquement à des fins éducatives
✓ Respecter les autres utilisateurs et le personnel
✓ Ne pas publier de contenu inapproprié ou offensant
✓ Ne pas tenter de pirater ou compromettre la plateforme
✓ Signaler tout comportement suspect
✓ Respecter les lois en vigueur

✗ Comportements interdits :
• Harcèlement ou intimidation
• Publication de faux contenu
• Utilisation de bots ou scripts automatisés
• Partage de compte
• Copie ou distribution non autorisée`
    },
    {
      title: '7. Protection des mineurs',
      content: `Nous prenons la protection des mineurs très sérieusement :

• Vérification de l'âge lors de l'inscription
• Consentement parental obligatoire pour les moins de 18 ans
• Modération du contenu
• Pas de publicité ciblée sur les mineurs
• Pas de vente de données personnelles

Les parents peuvent superviser l'activité de leur enfant via un compte parent dédié. Ils peuvent également demander la suppression des données de leur enfant à tout moment.`
    },
    {
      title: '8. Limitation de responsabilité',
      content: `EduPlatform ne peut être tenu responsable de :

• L'utilisation que vous faites de la plateforme
• Les résultats obtenus suite à l'utilisation des cours
• Les interruptions de service dues à des cas de force majeure
• Les contenus publiés par les utilisateurs
• Les dommages indirects ou consécutifs

Nous nous efforçons de maintenir la plateforme accessible et fonctionnelle, mais ne pouvons garantir un service ininterrompu ou exempt d'erreurs.`
    },
    {
      title: '9. Suspension et résiliation',
      content: `Nous nous réservons le droit de suspendre ou supprimer un compte en cas de :

• Violation des conditions d'utilisation
• Comportement frauduleux
• Non-paiement des abonnements
• Atteinte à la sécurité de la plateforme

En cas de suspension ou de résiliation, vous perdez l'accès à votre compte et à votre progression. Aucun remboursement ne sera effectué pour les périodes d'abonnement restantes, sauf décision contraire d'EduPlatform.`
    },
    {
      title: '10. Modifications des conditions',
      content: `Nous pouvons modifier ces conditions à tout moment. Les modifications entrent en vigueur 30 jours après leur publication.

Les utilisateurs seront notifiés par :
• Email à l'adresse enregistrée
• Bannière d'information sur la plateforme
• Notification in-app

L'utilisation continue de la plateforme après ce délai constitue l'acceptation des nouvelles conditions.`
    },
    {
      title: '11. Droit applicable et juridiction',
      content: `Les présentes conditions sont régies par le droit français.

En cas de litige :
1. Une médiation sera proposée en premier recours
2. Les tribunaux de Paris seront compétents à défaut d'accord

Vous avez le droit de recourir à un médiateur de la consommation agréé. Les coordonnées sont disponibles sur notre site.`
    },
    {
      title: '12. Contact',
      content: `Pour toute question concernant ces conditions :

EduPlatform SAS
Adresse : 123 Rue de l'Éducation, 75001 Paris, France
Email : legal@eduplatform.com
Téléphone : +33 1 23 45 67 89

Nos équipes sont disponibles du lundi au vendredi de 9h à 18h.`
    }
  ];
}