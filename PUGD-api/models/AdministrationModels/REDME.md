#Description Table Module Administration

###  Administration des lecteurs 
``path: (FR) Administration ----> Lecteur`` [GuidEndligne](https://doc.sigb.net/pmb42/co/administration_lecteurs_v42.html)
<br/>
``path: (EN) Administration ----> Lecteur``
* ``Definition (selon PMB ):`` <br/> 

* Les lecteurs (emprunteurs, abonnés) sont les usagers de la bibliothèque ou du centre de documentation.
    * Le paramétrage des lecteurs permet de définir :

    * différentes `catégories` de lecteurs.

    * les fonctionnalités accessibles du logiciel avec les `statuts`.

    * des `codes statistiques`.

    * la saisie d'informations complémentaires avec les champs `personnalisables`.

Ce menu permet également un import des lecteurs depuis une application tierce.

### Fiche et corresondance pour Administration des lecteurs
 * `catégories` ----> `Categories_Brrowers.go` cette fiche se trouve dans le Module `CirculationModule` [Guid en ligne sur catégories](https://doc.sigb.net/pmb42/co/admin_empr_categ_v42.html) <br/>
 * `Statuts` ----> `StatutsBrrowers.go` cette fiche se trouve dans le Module `AdministrationModule` [Guid en ligne sur Statuts](https://doc.sigb.net/pmb42/co/admin_empr_statut_v42.html) <br/>
 * `Codes statistiques` ----> `CodeStaticModels.go` cette fiche se trouve dans le Module `AdministrationModule` [Guid en ligne sur Codes statistiques](https://doc.sigb.net/pmb42/co/admin_empr_codstat_v42.html) <br/>
 
 

###  Administration des Exemplaires 
``path: (FR) Administration ----> Exemplaires`` [Guid en ligne sur examplaire](https://doc.sigb.net/pmb42/co/administration_exemplaires_v42.html)
<br/>
``path: (EN) Administration ----> Exemplaires``
* ``Definition (selon PMB ):`` <br/> 
Les exemplaires correspondent aux documents physiques présents dans le fonds documentaire. Chaque exemplaire est lié à une notice ou un bulletin.

Le paramétrage des exemplaires permet de définir :

* des supports physiques utilisés également pour les règles de prêt et réservation.
  *  l'emplacement des documents au travers des localisations, sections et sur-localisations.

  * le fait que les exemplaires soient ou non empruntables avec les statuts.

  * des codes statistiques.

  * l'appartenance des exemplaires avec les propriétaires.

  * la saisie d'informations complémentaires avec les champs personnalisables.

#### Fiche et corresondance pour Administration des 
 * `supports` ----> `MediaTypesModels.go` cette fiche se trouve dans le Module  `AdministrationModule` [Guid en ligne sur supports](https://doc.sigb.net/pmb42/co/admin_docs_typdoc_v42.html) <br/>
 * `Localisations` ----> `Library.go` cette fiche se trouve dans le Module `CataloginModule` [Guid en ligne sur Localisation](https://doc.sigb.net/pmb42/co/admin_docs_location_v42.html) <br/>
 * `Sections` ----> `SectionModels.go` cette fiche se trouve dans le Module `AdministrationModule` [Guid en ligne sur Section](https://doc.sigb.net/pmb42/co/admin_docs_section_v42.html) <br/>
 * `Statuts` ----> `StatusModels.go` cette fiche se trouve dans le Module `AdministrationModule` [Guid en ligne sur Status](https://doc.sigb.net/pmb42/co/admin_docs_statut_v42.html) <br/>
 * `Codes statistiques` ----> `CodeStatistcModels.go` cette fiche se trouve dans le Module `AdministrationModule` [Guid en ligne sur Status](https://doc.sigb.net/pmb42/co/admin_docs_codstat_v42.html) <br/>
 * `Propriétaires` ----> `OwnerModels.go` cette fiche se trouve dans le Module `AdministrationModule` [Guid en ligne sur Status](https://doc.sigb.net/pmb42/co/admin_docs_codstat_v42.html) <br/>
 


