import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export type TermVm = {
  id: string;
  term: string;
  definition: string;
  category: string;
  subject: string;
};

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './glossary.component.html'
})
export class GlossaryComponent {
  isLoading = signal(true);
  searchQuery = signal('');
  selectedSubject = signal('all');

  subjects = signal([
    'all', 'Mathématiques', 'Physique', 'Chimie', 'Français', 
    'Arabe', 'Anglais', 'SVT', 'Histoire-Géo', 'Philosophie'
  ]);

  terms = signal<TermVm[]>([
    // Mathématiques
    { id: 'm1', term: 'Algèbre', definition: 'Branche des mathématiques étudiant les structures algébriques, les équations et les opérations mathématiques.', category: 'Mathématiques', subject: 'Mathématiques' },
    { id: 'm2', term: 'Géométrie', definition: 'Science des figures et des espaces, étudiant les formes, les grandeurs et les positions relatives.', category: 'Mathématiques', subject: 'Mathématiques' },
    { id: 'm3', term: 'Théorème de Pythagore', definition: 'Dans un triangle rectangle, le carré de l\'hypoténuse égale la somme des carrés des deux autres côtés.', category: 'Mathématiques', subject: 'Mathématiques' },
    { id: 'm4', term: 'Fonction', definition: 'Relation qui associe chaque élément d\'un ensemble à un unique élément d\'un autre ensemble.', category: 'Mathématiques', subject: 'Mathématiques' },
    { id: 'm5', term: 'Dérivée', definition: 'Taux de variation instantané d\'une fonction en un point, représentant la pente de la tangente.', category: 'Mathématiques', subject: 'Mathématiques' },
    { id: 'm6', term: 'Intégrale', definition: 'Opération inverse de la dérivée, permettant de calculer l\'aire sous une courbe.', category: 'Mathématiques', subject: 'Mathématiques' },
    
    // Physique
    { id: 'p1', term: 'Mécanique', definition: 'Branche de la physique étudiant le mouvement des corps et les forces qui le provoquent.', category: 'Physique', subject: 'Physique' },
    { id: 'p2', term: 'Thermodynamique', definition: 'Science étudiant les échanges de chaleur et les transformations d\'énergie.', category: 'Physique', subject: 'Physique' },
    { id: 'p3', term: 'Optique', definition: 'Branche de la physique étudiant la lumière, sa propagation et ses interactions avec la matière.', category: 'Physique', subject: 'Physique' },
    { id: 'p4', term: 'Électromagnétisme', definition: 'Étude des phénomènes électriques et magnétiques et de leurs interactions.', category: 'Physique', subject: 'Physique' },
    { id: 'p5', term: 'Force', definition: 'Vecteur caractérisant l\'interaction entre deux corps, pouvant modifier le mouvement.', category: 'Physique', subject: 'Physique' },
    { id: 'p6', term: 'Énergie', definition: 'Capacité d\'un système à produire un travail ou un transfert de chaleur.', category: 'Physique', subject: 'Physique' },
    
    // Chimie
    { id: 'c1', term: 'Molécule', definition: 'Assemblage d\'atomes liés par des liaisons chimiques, constituant la plus petite unité d\'un corps pur.', category: 'Chimie', subject: 'Chimie' },
    { id: 'c2', term: 'Atome', definition: 'Plus petite unité constitutive de la matière, composed d\'un noyau et d\'électrons.', category: 'Chimie', subject: 'Chimie' },
    { id: 'c3', term: 'Réaction chimique', definition: 'Transformation au cours de laquelle des substances se transforment en d\'autres substances.', category: 'Chimie', subject: 'Chimie' },
    { id: 'c4', term: 'Liaison covalente', definition: 'Liaison chimique résultant de la mise en commun d\'électrons entre deux atomes.', category: 'Chimie', subject: 'Chimie' },
    { id: 'c5', term: 'Oxydoréduction', definition: 'Réaction impliquant un transfert d\'électrons entre espèces chimiques.', category: 'Chimie', subject: 'Chimie' },
    
    // Français
    { id: 'f1', term: 'Métaphore', definition: 'Figure de style consistant à identifier deux éléments sans utiliser de mot comparatif.', category: 'Français', subject: 'Français' },
    { id: 'f2', term: 'Métonymie', definition: 'Figure de style consistant à remplacer un terme par un autre qui lui est lié logiquement.', category: 'Français', subject: 'Français' },
    { id: 'f3', term: 'Hypotypose', definition: 'Figure de style consistant à représenter une scène de manière si vivante qu\'elle semble se dérouler sous les yeux.', category: 'Français', subject: 'Français' },
    { id: 'f4', term: 'Subjonctif', definition: 'Mode verbal exprimant un désir, un doute, une possibilité ou une émotion.', category: 'Français', subject: 'Français' },
    
    // SVT
    { id: 's1', term: 'ADN', definition: 'Acide désoxyribonucléique, molécule portant l\'information génétique héréditaire.', category: 'SVT', subject: 'SVT' },
    { id: 's2', term: 'Photosynthèse', definition: 'Processus par lequel les plantes transforment le dioxyde de carbone et l\'eau en glucose et oxygène.', category: 'SVT', subject: 'SVT' },
    { id: 's3', term: 'Écosystème', definition: 'Ensemble formé par un milieu et les êtres vivants qui y vivent et interagissent.', category: 'SVT', subject: 'SVT' },
    { id: 's4', term: 'Mitose', definition: 'Processus de division cellulaire permettant la multiplication des cellules somatiques.', category: 'SVT', subject: 'SVT' },
    
    // Histoire-Géo
    { id: 'h1', term: 'Impérialisme', definition: 'Politique d\'extension de la puissance d\'un État sur d\'autres territoires ou peuples.', category: 'Histoire', subject: 'Histoire-Géo' },
    { id: 'h2', term: 'Mondialisation', definition: 'Processus d\'intensification des échanges économiques, culturels et politiques à l\'échelle mondiale.', category: 'Géographie', subject: 'Histoire-Géo' },
    { id: 'h3', term: 'Révolution industrielle', definition: 'Transformation économique et sociale du XVIIIe-XIXe siècle marquée par l\'essor de l\'industrie.', category: 'Histoire', subject: 'Histoire-Géo' },
    { id: 'h4', term: 'Urbanisation', definition: 'Croissance de la part de la population urbaine dans la population totale.', category: 'Géographie', subject: 'Histoire-Géo' },
    
    // Philosophie
    { id: 'ph1', term: 'Existentialisme', definition: 'Courant philosophique centré sur l\'existence humaine et la liberté de l\'individu.', category: 'Philosophie', subject: 'Philosophie' },
    { id: 'ph2', term: 'Matérialisme', definition: 'Doctrine considérant que seule la matière existe et que la conscience en est un produit.', category: 'Philosophie', subject: 'Philosophie' },
    { id: 'ph3', term: 'Liberté', definition: 'Capacité de choisir et d\'agir selon sa volonté, sans contrainte externe.', category: 'Philosophie', subject: 'Philosophie' },
    { id: 'ph4', term: 'Conscience', definition: 'Connaissance immédiate que l\'individu a de lui-même et du monde qui l\'entoure.', category: 'Philosophie', subject: 'Philosophie' }
  ]);

  filteredTerms() {
    let result = this.terms();
    
    if (this.selectedSubject() !== 'all') {
      result = result.filter(t => t.subject === this.selectedSubject());
    }
    
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter(t => 
        t.term.toLowerCase().includes(query) || 
        t.definition.toLowerCase().includes(query)
      );
    }
    
    return result;
  }

  constructor() {
    setTimeout(() => this.isLoading.set(false), 500);
  }

  filterBySubject(subject: string) {
    this.selectedSubject.set(subject);
  }
}
