'use client'

import { useState } from 'react'
import { ServiceCategory, SERVICE_CATEGORIES } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Plus, X, Star, Clock, Euro } from 'lucide-react'
import Link from 'next/link'

interface ServiceExtra {
  title: string
  description: string
  price: number
  delivery_days_added: number
}

export default function CreateServicePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ServiceCategory>('beats')
  const [price, setPrice] = useState<number>(50)
  const [deliveryDays, setDeliveryDays] = useState<number>(3)
  const [revisionsIncluded, setRevisionsIncluded] = useState<number>(2)
  const [commercialUse, setCommercialUse] = useState(true)
  const [sourceFiles, setSourceFiles] = useState(false)
  const [rushDelivery, setRushDelivery] = useState(false)
  const [rushDeliveryDays, setRushDeliveryDays] = useState<number>(1)
  const [rushDeliveryPrice, setRushDeliveryPrice] = useState<number>(20)
  const [requirements, setRequirements] = useState('')
  const [extras, setExtras] = useState<ServiceExtra[]>([])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addExtra = () => {
    setExtras([...extras, {
      title: '',
      description: '',
      price: 10,
      delivery_days_added: 1
    }])
  }

  const removeExtra = (index: number) => {
    setExtras(extras.filter((_, i) => i !== index))
  }

  const updateExtra = (index: number, field: keyof ServiceExtra, value: string | number) => {
    const newExtras = [...extras]
    newExtras[index] = { ...newExtras[index], [field]: value }
    setExtras(newExtras)
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // TODO: Create service in database
      console.log('Creating service:', {
        title,
        description,
        category,
        price,
        deliveryDays,
        revisionsIncluded,
        commercialUse,
        sourceFiles,
        rushDelivery,
        requirements,
        extras
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to service page or dashboard
      window.location.href = '/dashboard?success=service_created'
      
    } catch (error) {
      console.error('Error creating service:', error)
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return title.trim() && description.trim() && category
      case 2:
        return price > 0 && deliveryDays > 0 && revisionsIncluded >= 0
      case 3:
        return true // Optional step
      case 4:
        return true // Review step
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              BPM Connect
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline">
                  Retour au dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un nouveau service 🚀
          </h1>
          <p className="text-gray-600">
            Présentez votre expertise et commencez à monétiser vos compétences
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Étape {currentStep} sur 4</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Informations</span>
            <span>Tarification</span>
            <span>Options</span>
            <span>Validation</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Informations de base'}
              {currentStep === 2 && 'Tarification et délais'}
              {currentStep === 3 && 'Options avancées'}
              {currentStep === 4 && 'Validation et publication'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Décrivez votre service et choisissez sa catégorie'}
              {currentStep === 2 && 'Définissez vos prix et délais de livraison'}
              {currentStep === 3 && 'Ajoutez des options et services supplémentaires'}
              {currentStep === 4 && 'Vérifiez et publiez votre service'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select value={category} onValueChange={(value) => setCategory(value as ServiceCategory)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SERVICE_CATEGORIES).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{info.emoji}</span>
                            <div>
                              <div className="font-medium">{info.label}</div>
                              <div className="text-xs text-gray-500">{info.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Titre du service *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Beat trap professionnel avec mix inclus"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={80}
                  />
                  <p className="text-xs text-gray-500 mt-1">{title.length}/80 caractères</p>
                </div>

                <div>
                  <Label htmlFor="description">Description détaillée *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez précisément ce que vous proposez, votre processus de travail, ce qui est inclus..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    maxLength={1000}
                  />
                  <p className="text-xs text-gray-500 mt-1">{description.length}/1000 caractères</p>
                </div>

                <div>
                  <Label htmlFor="requirements">Prérequis du client (optionnel)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Ex: Fichiers séparés en WAV 24bit, références musicales, BPM souhaité..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Pricing */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Prix de base *</Label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        min="5"
                        max="5000"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Prix minimum: 5€</p>
                  </div>

                  <div>
                    <Label htmlFor="delivery">Délai de livraison *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="delivery"
                        type="number"
                        min="1"
                        max="30"
                        value={deliveryDays}
                        onChange={(e) => setDeliveryDays(Number(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">En jours (maximum 30)</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="revisions">Révisions incluses</Label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="revisions"
                      type="number"
                      min="0"
                      max="10"
                      value={revisionsIncluded}
                      onChange={(e) => setRevisionsIncluded(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Nombre de révisions gratuites</p>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Ce qui est inclus</Label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={commercialUse}
                        onChange={(e) => setCommercialUse(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <div>
                        <div className="font-medium">Usage commercial</div>
                        <div className="text-sm text-gray-600">Le client peut utiliser le résultat à des fins commerciales</div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={sourceFiles}
                        onChange={(e) => setSourceFiles(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <div>
                        <div className="font-medium">Fichiers sources</div>
                        <div className="text-sm text-gray-600">Projet original (FL Studio, Logic, Ableton...)</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Rush Delivery */}
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      checked={rushDelivery}
                      onChange={(e) => setRushDelivery(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <div>
                      <div className="font-medium">⚡ Livraison express</div>
                      <div className="text-sm text-gray-600">Proposer une option de livraison accélérée</div>
                    </div>
                  </div>

                  {rushDelivery && (
                    <div className="grid md:grid-cols-2 gap-4 ml-6">
                      <div>
                        <Label>Délai express (jours)</Label>
                        <Input
                          type="number"
                          min="1"
                          max={deliveryDays - 1}
                          value={rushDeliveryDays}
                          onChange={(e) => setRushDeliveryDays(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Coût supplémentaire (€)</Label>
                        <Input
                          type="number"
                          min="5"
                          value={rushDeliveryPrice}
                          onChange={(e) => setRushDeliveryPrice(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Extras */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Options supplémentaires</h3>
                  <p className="text-gray-600 mb-4">
                    Proposez des services additionnels pour augmenter la valeur de vos commandes
                  </p>

                  {extras.map((extra, index) => (
                    <Card key={index} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Option {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExtra(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Titre</Label>
                            <Input
                              placeholder="Ex: Mix supplémentaire"
                              value={extra.title}
                              onChange={(e) => updateExtra(index, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Prix (€)</Label>
                            <Input
                              type="number"
                              min="5"
                              value={extra.price}
                              onChange={(e) => updateExtra(index, 'price', Number(e.target.value))}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Décrivez ce service supplémentaire..."
                            value={extra.description}
                            onChange={(e) => updateExtra(index, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="mt-4">
                          <Label>Délai supplémentaire (jours)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="7"
                            value={extra.delivery_days_added}
                            onChange={(e) => updateExtra(index, 'delivery_days_added', Number(e.target.value))}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addExtra}
                    className="w-full"
                    disabled={extras.length >= 5}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une option ({extras.length}/5)
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">
                    Aperçu de votre service
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <span className="font-medium">Catégorie :</span>
                      <Badge className="ml-2">
                        {SERVICE_CATEGORIES[category].label}
                      </Badge>
                    </div>

                    <div>
                      <span className="font-medium">Titre :</span>
                      <p className="mt-1">{title}</p>
                    </div>

                    <div>
                      <span className="font-medium">Description :</span>
                      <p className="mt-1 text-gray-700">{description}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <span className="font-medium">Prix :</span>
                        <p className="text-xl font-bold text-green-600">{price}€</p>
                      </div>
                      <div>
                        <span className="font-medium">Livraison :</span>
                        <p>{deliveryDays} jours</p>
                      </div>
                      <div>
                        <span className="font-medium">Révisions :</span>
                        <p>{revisionsIncluded} incluses</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium">Inclus :</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {commercialUse && <Badge variant="secondary">Usage commercial</Badge>}
                        {sourceFiles && <Badge variant="secondary">Fichiers sources</Badge>}
                        {rushDelivery && <Badge variant="secondary">⚡ Livraison express</Badge>}
                      </div>
                    </div>

                    {extras.length > 0 && (
                      <div>
                        <span className="font-medium">Options supplémentaires :</span>
                        <ul className="mt-2 space-y-1">
                          {extras.map((extra, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{extra.title}</span>
                              <span className="font-medium">+{extra.price}€</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Une fois publié, votre service sera visible par tous les utilisateurs. 
                    Vous pourrez le modifier à tout moment depuis votre dashboard.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !canProceed()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Publication...' : '🎉 Publier le service'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
