import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  toast = inject(ToastService);
  
  contactUs() {
    this.toast.info("Redirection vers le formulaire de contact...");
  }

  lastUpdated = '23 Mars 2025';

  sections = [
    {
      title: '1. Collecte des données personnelles',
      content: `Nous collectons les données personnelles que vous nous fournissez directement, notamment :

• Nom et prénom
• Adresse email
• Numéro de téléphone (facultatif)
• Date de naissance (pour les comptes élèves)
• Informations de paiement (pour les abonnements premium)

Nous collectons également automatiquement certaines données lorsque vous utilisez notre plateforme :
• Adresse IP
• Type de navigateur
• Pages visitées
• Temps passé sur chaque page
• Préférences d'apprentissage`
    },
    {
      title: '2. Utilisation des données',
      content: `Vos données personnelles sont utilisées pour :

• Fournir et améliorer nos services éducatifs
• Personnaliser votre expérience d'apprentissage
• Communiquer avec vous concernant votre compte
• Envoyer des notifications importantes et des mises à jour
• Analyser l'utilisation de la plateforme pour des fins statistiques
• Prévenir la fraude et assurer la sécurité de la plateforme`
    },
    {
      title: '3. Partage des données',
      content: `Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données uniquement dans les cas suivants :

• Avec les professeurs pour le suivi pédagogique (pour les comptes élèves)
• Avec les parents/tuteurs (pour les comptes mineurs)
• Avec nos prestataires de services techniques (hébergement, paiement)
• Si la loi l'exige ou pour répondre à une procédure judiciaire
• Avec votre consentement explicite`
    },
    {
      title: '4. Protection des données',
      content: `Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :

• Chiffrement SSL/TLS pour toutes les communications
• Stockage sécurisé avec chiffrement des données sensibles
• Accès restreint aux données personnelles (besoin de connaître)
• Surveillance continue des systèmes
• Sauvegardes régulières et sécurisées
• Formation du personnel à la protection des données`
    },
    {
      title: '5. Droits des utilisateurs',
      content: `Conformément au RGPD, vous disposez des droits suivants :

• Droit d'accès : Consulter vos données personnelles
• Droit de rectification : Corriger des données inexactes
• Droit à l'effacement : Demander la suppression de vos données
• Droit à la portabilité : Recevoir vos données dans un format standard
• Droit d'opposition : Refuser certains traitements de données
• Droit de limitation : Restreindre le traitement de vos données

Pour exercer ces droits, contactez-nous à privacy@eduplatform.com`
    },
    {
      title: '6. Cookies',
      content: `Notre site utilise des cookies pour :

• Cookies essentiels : Authentification, sécurité
• Cookies analytiques : Mesure d'audience anonyme
• Cookies de préférence : Mémorisation de vos choix

Vous pouvez gérer vos préférences de cookies à tout moment dans les paramètres de votre navigateur. La désactivation de certains cookies peut affecter les fonctionnalités de la plateforme.`
    },
    {
      title: '7. Données des mineurs',
      content: `Pour les utilisateurs de moins de 18 ans :

• Le consentement parental est requis pour créer un compte
• Les parents peuvent consulter et gérer les données de leur enfant
• Les données des mineurs ne sont pas utilisées à des fins marketing
• Les comptes parents peuvent superviser l'activité de leur enfant
• Les données sont supprimées à la demande des parents`
    },
    {
      title: '8. Conservation des données',
      content: `Nous conservons vos données personnelles uniquement pendant la durée nécessaire :

• Données de compte : Jusqu'à suppression du compte + 3 ans
• Données de paiement : 5 ans (obligations légales)
• Logs de connexion : 1 an
• Données analytiques : 2 ans (anonymisées)

Après suppression de votre compte, vos données sont anonymisées ou supprimées conformément à nos politiques de rétention.`
    },
    {
      title: '9. Modifications de la politique',
      content: `Nous nous réservons le droit de modifier cette politique de confidentialité. En cas de modification significative :

• Notification par email à tous les utilisateurs
• Bannière d'information sur la plateforme
• Mise à jour de la date de dernière modification

L'utilisation continue de la plateforme après modification constitue une acceptation des nouvelles conditions.`
    },
    {
      title: '10. Contact',
      content: `Pour toute question concernant cette politique de confidentialité :

EduPlatform SAS
Adresse : 123 Rue de l'Éducation, 75001 Paris, France
Email : privacy@eduplatform.com
Téléphone : +33 1 23 45 67 89
DPO : dpo@eduplatform.com

Vous avez le droit de déposer une réclamation auprès de la CNIL si vous estimez que vos données ne sont pas traitées conformément au RGPD.`
    }
  ];
}