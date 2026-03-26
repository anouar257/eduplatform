import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  activeIndex: number | null = null;

  faqCategories = [
    {
      title: 'Questions générales',
      icon: '❓',
      questions: [
        {
          question: 'Qu\'est-ce qu\'EduPlatform ?',
          answer: 'EduPlatform est une plateforme d\'apprentissage en ligne conçue pour les élèves du primaire au lycée. Nous proposons des cours, des examens, des sessions live et des ressources éducatives de qualité.'
        },
        {
          question: 'Comment puis-je m\'inscrire ?',
          answer: 'L\'inscription est simple et gratuite. Cliquez sur le bouton "S\'inscrire" en haut à droite de la page, remplissez le formulaire avec vos informations et créez votre compte en quelques minutes.'
        },
        {
          question: 'Quelles matières sont disponibles ?',
          answer: 'Nous proposons des cours dans toutes les matières principales : Mathématiques, Français, Anglais, Sciences, Histoire-Géographie, Physique, Chimie, et bien plus encore.'
        }
      ]
    },
    {
      title: 'Cours et apprentissage',
      icon: '📚',
      questions: [
        {
          question: 'Comment accéder aux cours ?',
          answer: 'Après inscription, vous pouvez parcourir notre catalogue de cours. Cliquez sur un cours pour voir les détails et vous inscrire. Une fois inscrit, vous aurez accès à toutes les leçons.'
        },
        {
          question: 'Les cours sont-ils gratuits ?',
          answer: 'Nous proposons à la fois des cours gratuits et premium. Les cours gratuits vous donnent un aperçu de notre méthode d\'enseignement, tandis que les cours premium offrent un contenu plus approfondi.'
        },
        {
          question: 'Puis-je télécharger les cours ?',
          answer: 'Oui, certaines ressources comme les PDF et les exercices peuvent être téléchargées. Cependant, les vidéos sont uniquement disponibles en streaming pour garantir la meilleure qualité.'
        }
      ]
    },
    {
      title: 'Examens et tests',
      icon: '📝',
      questions: [
        {
          question: 'Comment fonctionnent les examens ?',
          answer: 'Les examens sont des tests chronométrés qui évaluent vos connaissances. Vous pouvez passer un examen à tout moment. À la fin, vous recevez votre score et des explications détaillées.'
        },
        {
          question: 'Puis-je repasser un examen ?',
          answer: 'Oui, vous pouvez repasser un examen autant de fois que vous le souhaitez. Nous encourageons la pratique pour améliorer votre compréhension.'
        },
        {
          question: 'Y a-t-il une correction des examens ?',
          answer: 'Absolument ! Après chaque examen, vous recevez une correction détaillée avec des explications pour chaque question, ce qui vous permet d\'apprendre de vos erreurs.'
        }
      ]
    },
    {
      title: 'Sessions live',
      icon: '🎥',
      questions: [
        {
          question: 'Qu\'est-ce qu\'une session live ?',
          answer: 'Une session live est un cours en direct donné par un professeur. Vous pouvez poser des questions en temps réel et interagir avec le professeur et les autres élèves.'
        },
        {
          question: 'Comment rejoindre une session live ?',
          answer: 'Consultez le calendrier des sessions live, inscrivez-vous à celle qui vous intéresse, et cliquez sur le bouton "Rejoindre" au moment de la session.'
        },
        {
          question: 'Les sessions sont-elles enregistrées ?',
          answer: 'Oui, toutes les sessions live sont enregistrées et disponibles dans votre espace personnel pour les revoir à tout moment.'
        }
      ]
    },
    {
      title: 'Compte et facturation',
      icon: '💳',
      questions: [
        {
          question: 'Comment modifier mon profil ?',
          answer: 'Connectez-vous à votre compte, accédez à votre tableau de bord, puis cliquez sur "Mon profil" pour modifier vos informations personnelles.'
        },
        {
          question: 'Comment annuler mon abonnement ?',
          answer: 'Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. L\'annulation prend effet à la fin de la période de facturation en cours.'
        },
        {
          question: 'Quels modes de paiement acceptez-vous ?',
          answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard), les paiements mobiles et les virements bancaires. Tous les paiements sont sécurisés.'
        }
      ]
    },
    {
      title: 'Support technique',
      icon: '🔧',
      questions: [
        {
          question: 'J\'ai oublié mon mot de passe, que faire ?',
          answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion. Entrez votre email et vous recevrez un lien pour réinitialiser votre mot de passe.'
        },
        {
          question: 'La plateforme ne fonctionne pas correctement',
          answer: 'Essayez de vider le cache de votre navigateur ou d\'utiliser un autre navigateur. Si le problème persiste, contactez notre support via la page Contact.'
        },
        {
          question: 'Comment contacter le support ?',
          answer: 'Vous pouvez nous contacter via le formulaire de contact sur notre site, par email à support@eduplatform.com, ou par téléphone au +33 1 23 45 67 89.'
        }
      ]
    }
  ];

  toggleFaq(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}