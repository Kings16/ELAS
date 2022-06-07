import os
import csv
from orm_interface.base import Session
from orm_interface.entities.e3_entity.e3_courses import E3_Courses, E3_Rating
from flask import Blueprint, request, jsonify
from orm_interface.base import Base, Session, engine


Base.metadata.create_all(engine)
session = Session()

e3_selector = Blueprint("e3_selector", __name__)


@e3_selector.route("/home")
@e3_selector.route("/")
def course_insights_home():
    return "E3 Selector home"


@e3_selector.route("/shared/<slug>", methods=["GET", "POST"])
def share(slug):
    if request.method == "GET":
        with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), "shared.csv"), "r") as file:
            filereader = csv.reader(file)
            for row in filereader:
                if row[0] == slug:
                    return {"e3selected": row[1], "e3filters": row[2]}
            return ""
    else:
        with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), "shared.csv"), "a") as file:
            filewriter = csv.writer(file)
            filewriter.writerow([slug, request.json["e3selected"], request.json["e3filters"]])
        return ""


#### The below Api gets data from the database und makes it available for a client
@e3_selector.route("/e3_courses_and_rating", methods=['GET'])
def gete3course():
        #get all courses from database
 
    docs = session.query(E3_Courses).join(E3_Rating).all()
 
    response= []
    #get all the data from data base with join ! 
    for e3cours in docs:
        for e3rating in e3cours.e3_rating:
  
          response.append({
            "selected": e3cours.selected,
            "Title": e3cours.name,
            "Link": e3cours.url,
            "catalog" : e3cours.catalog,
            "Type" : e3cours.type,
            "SWS" :e3cours.sws,
            "Erwartete Teilnehmer" : e3cours.num_expected_participants,
            "Max. Teilnehmer" : e3cours.max_participants,
            "Credits" : e3cours.credit,
            "Language" : e3cours.language,
            "Description" :e3cours.description,
            "Times_manual" :e3cours.time_manual,
            "Location" :e3cours.location ,
            "Exam" :  e3cours.exam_type,
            "Ausgeschlossen_Ingenieurwissenschaften_Bachelor" : e3cours.ausgeschlossen_ingenieurwissenschaften_bachelor,
            "fairness" : e3rating.fairness,
            "support": e3rating.support,
            "material": e3rating.material,
            "fun": e3rating.fun,
            "comprehensibility": e3rating.comprehensibility,
            "interesting": e3rating.interesting,
            "grade_effort": e3rating.grade_effort
        })
    return jsonify(response)



