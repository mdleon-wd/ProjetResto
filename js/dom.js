$(document).ready(function(){
 
    var veg = 0;
    var $fish, $meat; // $ devant notre variable pour indiquer 
                      //qu'elle stocke les éléments renvoyés par jQuery

        // remplace automatiquement les plats contenant de la viande 
        // par des plats végétariens lorsque le bouton "Go Vegetarian" est cliqué.
        $("#vegOn").on('click', function(){

            if (veg == 0){ // si condition est  égale à false
                
                // Suppression car n'a pas substitution pour l'entrées poisson
                $fish = $(".fish").parent().parent().detach();

                // Remplacement des hamburgers avec portobello
                $(".hamburger").replaceWith("<li class='portobello'><em>Portobello Mushroom</em></li>");
                
                // Remplace tous les plats à base de viande et oeufs,
                // sauf les hamburgers avec tofu dans deux étapes

                // 1- Insertion des éléments li de la classe tofu dans le DOM après les éléments "meat".
                $(".meat").after("<li class='tofu'><em>Tofu</em></li>");

                // 2- Détachement des éléments de la classe "meat" et maintien dans une variable.
                $meat = $(".meat").detach(); 
                
                // Ajoutez une icône de feuille à afficher à côté des entrées végétariennes de substitution.
                $(".portobello, .tofu").parent().parent().addClass("veg_leaf");
            
                veg = 1;

            }// fin if
        });//fin veg button
    

        //Restauration du menu à son état d'origine lorsque le bouton "Restore Me" est cliqué
        $("#restoreMe").on('click',function(){
        
            if (veg == 1){  // si condition est égale à true

                // Suppression de leaf icon
                $(".portobello, .tofu").parent().parent().removeClass("veg_leaf");
                
                //Remettre les entrées "fish" dans le menu où nous les avons supprimées
                $(".menu_entrees li").filter(":first").before($fish);
                
                // Trouver les éléments li dans la classe portobello et les remplacer 
                // par des éléments li dans la classe hamburger
                $(".portobello").replaceWith("<li class='hamburger'>hamburger</li>");
                
                // Trouvez des entrées qui contiennent du tofu et 
                // remplacez-les par les différentes sortes de viande
                $(".tofu").each( function(index){ //index => pour garder un compte de l'élément sur lequel chacun travaille
                    $(this).after($meat[index]);
                });//fin each
               
                // Suppression des données et des événements des éléments de tofu.
                $(".tofu").remove();
                
                veg = 0;

            }//fin if
        });//fin restoreMe button
    });//fin doc ready
    
    