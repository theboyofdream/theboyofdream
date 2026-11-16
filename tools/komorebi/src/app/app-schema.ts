import { defineToolcraft, mediaSourceModule } from "@/toolcraft/runtime";

import appDefaults from "./app-defaults.json" with { type: "json" };
import { appIdentity } from "./app-identity";

export const appSchema = defineToolcraft({
  defaults: appDefaults,
  base: {
    canvas: {
      enabled: true,
      upload: true,
    },
    identity: appIdentity,
    panels: {
      controls: {
        sections: [
        {
          controls: {
            mode:{defaultValue:"dapple",description:"Corner twig shows bark with few leaves; canopy is a dense leaf mass.",label:"Shape",options:[{label:"Corner twig",value:"branch"},{label:"Canopy",value:"dapple"},{label:"Pinnate leaflets",value:"compound"},{label:"Leaf drift",value:"drift"}],applicability:{mode:"always"},target:"komorebi.mode",type:"select",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            leafShape:{defaultValue:"pointed",label:"Leaf shape",options:[{label:"Pointed",value:"pointed"},{label:"Lanceolate",value:"lance"},{label:"Broad",value:"broad"},{label:"Oval",value:"oval"}],applicability:{mode:"always"},target:"komorebi.leafShape",type:"select",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            density:{defaultValue:100,label:"Leaf density",max:250,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.density",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            size:{defaultValue:100,label:"Leaf size",max:200,min:50,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.size",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            reach:{defaultValue:90,label:"Foliage reach",max:150,min:40,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.reach",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
          },
          id: "foliage",
          title: "Foliage",
        },
        {
          controls: {
            count:{defaultValue:3,label:"Branch count",max:6,min:1,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.count",type:"slider",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            thick:{defaultValue:150,label:"Branch thickness",max:400,min:40,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.thick",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            angle:{defaultValue:158,label:"Branch angle",max:180,min:-180,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.angle",type:"slider",unit:"°",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            ox:{defaultValue:102,label:"Origin X",max:120,min:-20,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.ox",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            oy:{defaultValue:12,label:"Origin Y",max:120,min:-20,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.oy",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            spread:{defaultValue:120,description:"Higher values make boughs enter from different edges and cross.",label:"Canopy spread",max:360,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.spread",type:"slider",unit:"°",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            falloff:{defaultValue:40,label:"Canopy falloff",max:100,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.falloff",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
          },
          id: "branches",
          title: "Branches",
        },
        {
          controls: {
            blend:{defaultValue:"plus-lighter",label:"Light type",options:[{label:"Shadow",value:"multiply"},{label:"Additive light",value:"plus-lighter"}],applicability:{mode:"always"},target:"komorebi.blend",type:"select",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            invert:{defaultValue:true,description:"Fill with light and cut leaf-shaped shadows out of it, for moonlight.",label:"Invert (moonlight)",applicability:{mode:"always"},target:"komorebi.invert",type:"switch",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            color:{defaultValue:"#8fa8d8",label:"Shadow color",applicability:{mode:"always"},target:"komorebi.color",type:"color",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            presence:{defaultValue:55,label:"Presence",max:100,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.presence",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            blur:{defaultValue:3,label:"Softness",max:16,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.blur",type:"slider",unit:"px",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            lightAngle:{defaultValue:140,label:"Light angle",max:180,min:-180,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.lightAngle",type:"slider",unit:"°",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            stretch:{defaultValue:120,label:"Light stretch",max:400,min:100,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.stretch",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            parallax:{defaultValue:20,label:"Layer parallax",max:120,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.parallax",type:"slider",unit:"px",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
          },
          id: "light",
          title: "Light",
        },
        {
          controls: {
            wind:{defaultValue:90,label:"Wind strength",max:200,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.wind",type:"slider",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            gust:{defaultValue:60,label:"Gustiness",max:100,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.gust",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            speed:{defaultValue:100,label:"Wind speed",max:300,min:20,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.speed",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            vary:{defaultValue:50,label:"Speed variation",max:100,min:0,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.vary",type:"slider",unit:"%",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
            seed:{defaultValue:2026,label:"Seed",max:9999,min:1,sliderValueKind:"continuous",step:1,applicability:{mode:"always"},target:"komorebi.seed",type:"slider",performanceReason:"Redraws one procedural leaf-shadow canvas; no extra passes.",performanceRole:"responsiveness"},
          },
          id: "wind",
          title: "Wind",
        },
      ],
        title: "Controls",
      },
    },
    toolbar: {
      history: true,
      radar: true,
      zoom: true,
    },
  },
  modules: [mediaSourceModule()],
});
