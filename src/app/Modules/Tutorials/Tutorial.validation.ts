import { z } from "zod";
import { Days } from "./Tutorial.constant";



const timeStringSchema = z.string().refine(
    (time) => {
        const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i; 
        return regex.test(time);
    },
    {
        message: 'Invalid time format, expected "HH:MMAM" or "HH:MMPM" (12-hour format)',
    }
);



const createTutorialValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: "name is required"}),
        email: z.string({required_error: "email is required"}).email(),
        userImageURL: z.string({required_error: "Image is required"}),
        tutorialImageURL: z.string({required_error: "Image is required"}),
        title: z.string({required_error: "title is required"}),
        language: z.string({required_error: "Language is required"}),
        price: z.number({required_error: "Price is required"}),
        description: z.string({required_error: "description is required"}),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        time: timeStringSchema,
       
        
    })
   
  
});

const updateTutorialValidationSchema = z.object({
    body: z.object({
        userImageURL: z.string({required_error: "Image is required"}).optional(),
        tutorialImageURL: z.string({required_error: "Image is required"}).optional(),
        title: z.string({required_error: "title is required"}),
        language: z.string({required_error: "Language is required"}).optional(),
        price: z.number({required_error: "Price is required"}).optional(),
        description: z.string({required_error: "description is required"}).optional(),
        days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
        time: timeStringSchema.optional(),
        
        
    })
   
});

export const TutorialValidationSchema = {
    createTutorialValidationSchema,
    updateTutorialValidationSchema
}