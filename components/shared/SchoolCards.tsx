
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

//<PaginationCards data={searchResults}

  type UserType = {
    rows:[{
        dob: string,
        firstName: string,
        userBio: string,
      }]};

  interface UserProps {
    user: UserType,
  }
const SchoolCards: FC<UserProps> = ({ user }): JSX.Element => {

    const [teacherdata, setTeachers] = useState<UserType | null>();
   
  return (
    <>
        
        <Card className="w-[350px]">
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>Register Student.</CardDescription>
              </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                        {teacherdata && teacherdata.rows.map((schoolname, index) =>(
                            <div key={index}>{schoolname.firstName}</div>
                        ))}
                        
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button type="submit">Submit</Button>
                    </CardFooter>
        </Card>
        <div className="flex flex-col w-full ">
                          <Label htmlFor="framework">Framework</Label>
                          <Select>
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Change Subject" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="next">Next.js</SelectItem>
                              <SelectItem value="sveltekit">SvelteKit</SelectItem>
                              <SelectItem value="astro">Astro</SelectItem>
                              <SelectItem value="nuxt">Nuxt.js</SelectItem>
                            </SelectContent>
                          </Select>
        </div>
     
      </>
  )
}

export default SchoolCards
