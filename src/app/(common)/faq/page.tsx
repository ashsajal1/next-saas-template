import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Faq() {
  return (
    <div>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="1">
            <AccordionTrigger>How do I use this?</AccordionTrigger>
            <AccordionContent>
              You can use this by clicking on the AccordionTrigger.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>What is the API?</AccordionTrigger>
            <AccordionContent>
              The API for the Accordion component is simple. Each AccordionItem
              should have a unique value prop, and the AccordionTrigger is used
              to trigger the AccordionContent to open or close.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>What if I want to render more than one AccordionTrigger?</AccordionTrigger>
            <AccordionContent>
              You can render as many AccordionTriggers as you want inside an AccordionItem.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  )
}
