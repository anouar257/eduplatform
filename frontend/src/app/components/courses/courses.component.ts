import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CourseCardComponent, CourseCardVm } from '../course-card/course-card.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  private fb = new FormBuilder();

  isLoading = signal(true);

  levels = signal<string[]>(['1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année', 'Bac', 'Collège', 'Lycée']);

  // Mapping pour les niveaux depuis l'URL
  levelMapping: { [key: string]: string } = {
    'primaire': '1ère année',
    'college': 'Collège',
    'lycee': 'Lycée',
    'bac': 'Bac'
  };

  categories = signal<string[]>([
    'Mathématiques',
    'Physique-Chimie',
    'Sciences de la Vie et de la Terre',
    'Français',
    'Arabe',
    'Anglais',
    'Histoire-Géographie',
    'Informatique',
    'Philosophie',
    'Économie'
  ]);

  filtersForm = this.fb.group({
    search: this.fb.control<string>('', { nonNullable: true }),
    category: this.fb.control<string>('', { nonNullable: true }),
    level: this.fb.control<string>('', { nonNullable: true })
  });

  private allCourses = signal<CourseCardVm[]>([
    // 1ère année
    {
      id: 'c1',
      title: 'Mathématiques — Opérations de base',
      teacherName: 'M. Amine',
      durationMin: 95,
      levelName: '1ère année',
      categoryName: 'Mathématiques',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c2',
      title: 'Français — Lecture et compréhension',
      teacherName: 'Mme Karima',
      durationMin: 70,
      levelName: '1ère année',
      categoryName: 'Français',
      coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60'
    },
    // 2ème année
    {
      id: 'c3',
      title: 'Algèbre — Équations et inéquations',
      teacherName: 'M. Amine',
      durationMin: 110,
      levelName: '2ème année',
      categoryName: 'Mathématiques',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c4',
      title: 'Physique — Les forces et mouvements',
      teacherName: 'Mme Salma',
      durationMin: 85,
      levelName: '2ème année',
      categoryName: 'Physique-Chimie',
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=60'
    },
    // 3ème année
    {
      id: 'c5',
      title: 'Mathématiques — Trigonométrie',
      teacherName: 'M. Amine',
      durationMin: 120,
      levelName: '3ème année',
      categoryName: 'Mathématiques',
      coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c6',
      title: 'SVT — La cellule et l\'hérédité',
      teacherName: 'Dr. Youssef',
      durationMin: 90,
      levelName: '3ème année',
      categoryName: 'Sciences de la Vie et de la Terre',
      coverUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=60'
    },
    // 4ème année
    {
      id: 'c7',
      title: 'Mathématiques — Analyse et fonctions',
      teacherName: 'Mme Inès',
      durationMin: 140,
      levelName: '4ème année',
      categoryName: 'Mathématiques',
      coverUrl: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c8',
      title: 'Philosophie — La conscience et l’inconscient',
      teacherName: 'M. Pierre',
      durationMin: 100,
      levelName: '4ème année',
      categoryName: 'Philosophie',
      coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=60'
    },
    // 5ème année
    {
      id: 'c9',
      title: 'Physique — Électromagnétisme',
      teacherName: 'Mme Salma',
      durationMin: 130,
      levelName: '5ème année',
      categoryName: 'Physique-Chimie',
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c10',
      title: 'Histoire — Le Maroc contemporain',
      teacherName: 'M. Hassan',
      durationMin: 75,
      levelName: '5ème année',
      categoryName: 'Histoire-Géographie',
      coverUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?auto=format&fit=crop&w=1200&q=60'
    },
    // 6ème année
    {
      id: 'c11',
      title: 'Mathématiques — Préparation au Bac',
      teacherName: 'M. Amine',
      durationMin: 180,
      levelName: '6ème année',
      categoryName: 'Mathématiques',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c12',
      title: 'Anglais — Expression orale et écrite',
      teacherName: 'Ms. Sarah',
      durationMin: 95,
      levelName: '6ème année',
      categoryName: 'Anglais',
      coverUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=60'
    },
    // Bac
    {
      id: 'c13',
      title: 'Mathématiques PC — Intégrales et équations différentielles',
      teacherName: 'M. Amine',
      durationMin: 150,
      levelName: 'Bac',
      categoryName: 'Mathématiques',
      coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c14',
      title: 'Économie — Macroéconomie et marchés financiers',
      teacherName: 'M. Omar',
      durationMin: 110,
      levelName: 'Bac',
      categoryName: 'Économie',
      coverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'c15',
      title: 'Informatique — Programmation Python',
      teacherName: 'M. Youssef',
      durationMin: 140,
      levelName: 'Bac',
      categoryName: 'Informatique',
      coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=60'
    }
  ]);

  // signals derived from reactive form
  search = signal('');
  category = signal('');
  level = signal('');

  filteredCourses = computed(() => {
    const q = this.search().trim().toLowerCase();
    const cat = this.category();
    const lvl = this.level();

    return this.allCourses().filter((c) => {
      const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.teacherName.toLowerCase().includes(q);
      const matchesCat = !cat || c.categoryName === cat;
      const matchesLvl = !lvl || c.levelName === lvl;
      return matchesSearch && matchesCat && matchesLvl;
    });
  });

  constructor(private route: ActivatedRoute, private router: Router) {
    // Écouter les changements du formulaire
    this.filtersForm.valueChanges.subscribe((v) => {
      this.search.set(v.search ?? '');
      this.category.set(v.category ?? '');
      this.level.set(v.level ?? '');
    });

    // Lire les queryParams de l'URL
    this.route.queryParams.subscribe(params => {
      if (params['level']) {
        const mappedLevel = this.levelMapping[params['level']] || params['level'];
        this.filtersForm.patchValue({ level: mappedLevel });
        this.level.set(mappedLevel);
      }
      if (params['category']) {
        this.filtersForm.patchValue({ category: params['category'] });
        this.category.set(params['category']);
      }
    });

    // simulate loading
    setTimeout(() => this.isLoading.set(false), 650);
  }

  clearFilters() {
    this.filtersForm.reset({ search: '', category: '', level: '' });
  }
}
