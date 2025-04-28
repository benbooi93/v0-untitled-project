"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AnimalGuide() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { t, language } = useLanguage()

  // Animal data with detailed information
  const animals = [
    {
      id: "grizzly-bear",
      name: "Grizzly Bear",
      nameEs: "Oso Grizzly",
      category: "mammals",
      scientificName: "Ursus arctos horribilis",
      habitat: "Mountain forests, alpine meadows, and river valleys",
      habitatEs: "Bosques de montaña, praderas alpinas y valles fluviales",
      description:
        "Massive brown bears with a distinctive shoulder hump and long front claws. They can weigh up to 800 pounds and stand over 7 feet tall when on hind legs.",
      descriptionEs:
        "Osos pardos masivos con una distintiva joroba en el hombro y largas garras delanteras. Pueden pesar hasta 360 kg y medir más de 2 metros de altura cuando están sobre las patas traseras.",
      locations: "Banff National Park, particularly along the Bow Valley Parkway and Lake Louise area",
      locationsEs: "Parque Nacional Banff, particularmente a lo largo de Bow Valley Parkway y el área de Lake Louise",
      dangerLevel: "High",
      dangerLevelEs: "Alto",
      seasonalActivity: "Most active from spring to fall, hibernating in winter",
      seasonalActivityEs: "Más activos desde la primavera hasta el otoño, hibernando en invierno",
      image: "https://images.pexels.com/photos/1068554/pexels-photo-1068554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      viewingTips: "Keep a safe distance (at least 100 meters), carry bear spray, make noise while hiking",
      viewingTipsEs:
        "Mantén una distancia segura (al menos 100 metros), lleva spray anti-osos, haz ruido mientras caminas",
      conservationStatus: "Threatened",
      conservationStatusEs: "Amenazado",
      behavior:
        "Solitary animals except for mothers with cubs. They can be aggressive if surprised or if they feel their cubs are threatened.",
      behaviorEs:
        "Animales solitarios excepto las madres con cachorros. Pueden ser agresivos si se les sorprende o si sienten que sus cachorros están amenazados.",
      diet: "Omnivorous - berries, plants, insects, fish, and occasionally larger mammals",
      dietEs: "Omnívoro - bayas, plantas, insectos, peces y ocasionalmente mamíferos más grandes",
      lifespan: "20-25 years",
      lifespanEs: "20-25 años",
      weight: "180-360 kg (400-800 lbs)",
      weightEs: "180-360 kg",
    },
    {
      id: "black-bear",
      name: "Black Bear",
      nameEs: "Oso Negro",
      category: "mammals",
      scientificName: "Ursus americanus",
      habitat: "Forests, mountains, and meadows",
      habitatEs: "Bosques, montañas y praderas",
      description:
        "Smaller than grizzlies with no shoulder hump and shorter claws. Despite their name, they can be black, brown, cinnamon, or even blonde in color.",
      descriptionEs:
        "Más pequeños que los grizzlies, sin joroba en el hombro y con garras más cortas. A pesar de su nombre, pueden ser negros, marrones, canela o incluso rubios.",
      locations: "Throughout the route, especially in forested areas near Revelstoke and along the Icefields Parkway",
      locationsEs:
        "A lo largo de la ruta, especialmente en áreas boscosas cerca de Revelstoke y a lo largo de Icefields Parkway",
      dangerLevel: "Moderate",
      dangerLevelEs: "Moderado",
      seasonalActivity: "Most active from spring to fall, hibernating in winter",
      seasonalActivityEs: "Más activos desde la primavera hasta el otoño, hibernando en invierno",
      image: "https://images.pexels.com/photos/31792203/pexels-photo-31792203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      viewingTips: "Keep a safe distance (at least 100 meters), carry bear spray, make noise while hiking",
      viewingTipsEs:
        "Mantén una distancia segura (al menos 100 metros), lleva spray anti-osos, haz ruido mientras caminas",
      conservationStatus: "Least Concern",
      conservationStatusEs: "Preocupación Menor",
      behavior:
        "Generally shy and will avoid humans if possible. More likely to climb trees when threatened than grizzlies.",
      behaviorEs:
        "Generalmente tímidos y evitarán a los humanos si es posible. Más propensos a trepar a los árboles cuando se sienten amenazados que los grizzlies.",
      diet: "Omnivorous - berries, nuts, insects, fish, and small mammals",
      dietEs: "Omnívoro - bayas, nueces, insectos, peces y pequeños mamíferos",
      lifespan: "15-25 years",
      lifespanEs: "15-25 años",
      weight: "90-270 kg (200-600 lbs)",
      weightEs: "90-270 kg",
    },
    {
      id: "moose",
      name: "Moose",
      nameEs: "Alce",
      category: "mammals",
      scientificName: "Alces alces",
      habitat: "Forests, wetlands, and willow flats",
      habitatEs: "Bosques, humedales y llanuras de sauces",
      description:
        "The largest member of the deer family with broad, palmate antlers (males). They have long legs, a humped shoulder, and a drooping snout.",
      descriptionEs:
        "El miembro más grande de la familia de los ciervos con astas anchas y palmeadas (machos). Tienen patas largas, un hombro jorobado y un hocico caído.",
      locations: "Throughout Banff National Park, especially near lakes and wetlands",
      locationsEs: "En todo el Parque Nacional Banff, especialmente cerca de lagos y humedales",
      dangerLevel: "Moderate to High",
      dangerLevelEs: "Moderado a Alto",
      seasonalActivity: "Active year-round, most visible at dawn and dusk",
      seasonalActivityEs: "Activos todo el año, más visibles al amanecer y al atardecer",
      image: "https://images.pexels.com/photos/16765204/pexels-photo-16765204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      viewingTips:
        "Keep a safe distance (at least 30 meters), be especially cautious during rutting season (fall) and calving season (spring)",
      viewingTipsEs:
        "Mantén una distancia segura (al menos 30 metros), sé especialmente cauteloso durante la temporada de apareamiento (otoño) y la temporada de parto (primavera)",
      conservationStatus: "Least Concern",
      conservationStatusEs: "Preocupación Menor",
      behavior: "Generally solitary and can be aggressive if approached too closely, especially cows with calves.",
      behaviorEs:
        "Generalmente solitarios y pueden ser agresivos si se les acerca demasiado, especialmente las hembras con crías.",
      diet: "Herbivorous - aquatic plants, shrubs, tree bark, and twigs",
      dietEs: "Herbívoro - plantas acuáticas, arbustos, corteza de árboles y ramitas",
      lifespan: "15-25 years",
      lifespanEs: "15-25 años",
      weight: "380-700 kg (800-1,500 lbs)",
      weightEs: "380-700 kg",
    },
    {
      id: "bald-eagle",
      name: "Bald Eagle",
      nameEs: "Águila Calva",
      category: "birds",
      scientificName: "Haliaeetus leucocephalus",
      habitat: "Near lakes, rivers, and coastal areas with large trees for nesting",
      habitatEs: "Cerca de lagos, ríos y áreas costeras con árboles grandes para anidar",
      description:
        "Large raptor with a distinctive white head and tail, yellow beak, and dark brown body. Wingspan can reach over 7 feet.",
      descriptionEs:
        "Gran rapaz con una distintiva cabeza y cola blancas, pico amarillo y cuerpo marrón oscuro. La envergadura puede alcanzar más de 2 metros.",
      locations: "Along rivers and lakes throughout the route, particularly in the Columbia River Valley",
      locationsEs: "A lo largo de ríos y lagos en toda la ruta, particularmente en el Valle del Río Columbia",
      dangerLevel: "Low",
      dangerLevelEs: "Bajo",
      seasonalActivity: "Year-round resident, more visible during salmon runs",
      seasonalActivityEs: "Residente durante todo el año, más visible durante las migraciones de salmón",
      image: "https://images.pexels.com/photos/16492380/pexels-photo-16492380.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      viewingTips: "Look for them perched in tall trees near water bodies, especially in early morning",
      viewingTipsEs: "Búscalos posados en árboles altos cerca de cuerpos de agua, especialmente temprano en la mañana",
      conservationStatus: "Least Concern (recovered from endangered status)",
      conservationStatusEs: "Preocupación Menor (recuperado del estado de peligro de extinción)",
      behavior:
        "Skilled hunters that primarily catch fish but also scavenge. They build massive nests that they return to year after year.",
      behaviorEs:
        "Cazadores hábiles que principalmente atrapan peces pero también carroñean. Construyen nidos masivos a los que regresan año tras año.",
      diet: "Primarily fish, also small mammals, birds, and carrion",
      dietEs: "Principalmente peces, también pequeños mamíferos, aves y carroña",
      lifespan: "20-30 years",
      lifespanEs: "20-30 años",
      weight: "3-6.5 kg (7-14 lbs)",
      weightEs: "3-6.5 kg",
    },
    {
      id: "salmon",
      name: "Pacific Salmon",
      nameEs: "Salmón del Pacífico",
      category: "fish",
      scientificName: "Oncorhynchus spp.",
      habitat: "Rivers, streams, and ocean",
      habitatEs: "Ríos, arroyos y océano",
      description:
        "Several species including Sockeye, Chinook, and Coho. They have streamlined bodies and change color from silver to red or green during spawning.",
      descriptionEs:
        "Varias especies incluyendo Sockeye, Chinook y Coho. Tienen cuerpos aerodinámicos y cambian de color de plateado a rojo o verde durante el desove.",
      locations: "Rivers and streams throughout British Columbia, particularly around Salmon Arm and the Adams River",
      locationsEs: "Ríos y arroyos en toda Columbia Británica, particularmente alrededor de Salmon Arm y el Río Adams",
      dangerLevel: "None",
      dangerLevelEs: "Ninguno",
      seasonalActivity: "Spawning runs typically occur in late summer and fall",
      seasonalActivityEs: "Las migraciones de desove típicamente ocurren a finales del verano y en otoño",
      image: "https://images.pexels.com/photos/9949215/pexels-photo-9949215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      viewingTips:
        "Best viewed during spawning season when they return to rivers. The Adams River sockeye run (every four years) is spectacular.",
      viewingTipsEs:
        "Mejor vistos durante la temporada de desove cuando regresan a los ríos. La migración de salmón sockeye del Río Adams (cada cuatro años) es espectacular.",
      conservationStatus: "Varies by species - some populations are threatened or endangered",
      conservationStatusEs: "Varía según la especie - algunas poblaciones están amenazadas o en peligro",
      behavior:
        "Known for their remarkable migration from freshwater to ocean and back to spawn in their natal streams. They die after spawning.",
      behaviorEs:
        "Conocidos por su notable migración desde agua dulce al océano y de regreso para desovar en sus arroyos natales. Mueren después de desovar.",
      diet: "Varies by life stage - plankton, insects, smaller fish",
      dietEs: "Varía según la etapa de vida - plancton, insectos, peces más pequeños",
      lifespan: "2-7 years depending on species",
      lifespanEs: "2-7 años dependiendo de la especie",
      weight: "2-30 kg (4-65 lbs) depending on species",
      weightEs: "2-30 kg dependiendo de la especie",
    },
  ]

  // Filter animals based on category
  const filteredAnimals =
    activeCategory === "all" ? animals : animals.filter((animal) => animal.category === activeCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge
          onClick={() => setActiveCategory("all")}
          className={`cursor-pointer ${activeCategory === "all" ? "bg-emerald-600" : "bg-secondary hover:bg-emerald-600/80"}`}
        >
          All Animals
        </Badge>
        <Badge
          onClick={() => setActiveCategory("mammals")}
          className={`cursor-pointer ${activeCategory === "mammals" ? "bg-emerald-600" : "bg-secondary hover:bg-emerald-600/80"}`}
        >
          Mammals
        </Badge>
        <Badge
          onClick={() => setActiveCategory("birds")}
          className={`cursor-pointer ${activeCategory === "birds" ? "bg-emerald-600" : "bg-secondary hover:bg-emerald-600/80"}`}
        >
          Birds
        </Badge>
        <Badge
          onClick={() => setActiveCategory("fish")}
          className={`cursor-pointer ${activeCategory === "fish" ? "bg-emerald-600" : "bg-secondary hover:bg-emerald-600/80"}`}
        >
          Fish
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={animal.image || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
                alt={animal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
                }}
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{language === "en" ? animal.name : animal.nameEs}</CardTitle>
              <CardDescription className="italic">{animal.scientificName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">{language === "en" ? "Info" : "Info"}</TabsTrigger>
                  <TabsTrigger value="habitat">{language === "en" ? t("habitat") : "Hábitat"}</TabsTrigger>
                  <TabsTrigger value="viewing">{language === "en" ? "Viewing" : "Observación"}</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Description" : "Descripción"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.description : animal.descriptionEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Danger Level" : "Nivel de Peligro"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.dangerLevel : animal.dangerLevelEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Diet" : "Dieta"}</h4>
                      <p className="text-sm text-muted-foreground">{language === "en" ? animal.diet : animal.dietEs}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Lifespan" : "Esperanza de Vida"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.lifespan : animal.lifespanEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Weight" : "Peso"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.weight : animal.weightEs}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="habitat" className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Habitat" : "Hábitat"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.habitat : animal.habitatEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Locations" : "Ubicaciones"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.locations : animal.locationsEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        {language === "en" ? "Seasonal Activity" : "Actividad Estacional"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.seasonalActivity : animal.seasonalActivityEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{language === "en" ? "Behavior" : "Comportamiento"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.behavior : animal.behaviorEs}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="viewing" className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium">
                        {language === "en" ? "Viewing Tips" : "Consejos para Observar"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.viewingTips : animal.viewingTipsEs}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        {language === "en" ? "Conservation Status" : "Estado de Conservación"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? animal.conservationStatus : animal.conservationStatusEs}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
